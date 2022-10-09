const express = require("express");
const app = express();
const socket = require("socket.io");
const cors = require("cors");
const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");

const peribahasa = require("./peribahasa");

const generateSoal = (peribahasas) => {
  const length = peribahasas.length - 1;
  const randomId = Math.round(Math.random() * length);
  const soal = peribahasas[randomId];
  if (soal?.isPassed) {
    return generateSoal(peribahasas);
  }

  const arrSoal = soal?.peribahasa?.split(" ") || [];
  const panjangSoal = arrSoal.length - 1;
  const hideStringIdx = Math.round(Math.random() * panjangSoal);
  const hideString = arrSoal[hideStringIdx];
  const tempSoal = soal?.peribahasa?.replace(
    hideString,
    "*".repeat(hideString.length)
  );
  return {
    soal: tempSoal,
    jawaban: hideString,
    arti: soal.arti,
    isPassed: true,
    peri: soal.peribahasa,
  };
};

function makeid(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const {
  getCurrentQuestion,
  getAnswer,
  getQuestionsByCategory,
} = require("./pertanyaan/index");

app.use(cors());

io = socket(server);

server.listen(8080, () => {
  console.log("server berjalan dalam port 8080");
});

var ROOM = [
  {
    name: "General",
    code: "general",
    players: [],
    max: 10,
    category: "sport",
    logs: [],
    room_icon: 3,
  },
  {
    name: "Have Fun",
    code: "fun",
    players: [],
    max: 10,
    category: "food",
    logs: [],
    room_icon: 1,
  },
];

io.on("connection", (socket) => {
  console.log("seseorang terkoneksi");
  socket.on("setUsername", (value) => {
    socket["username"] = value.username;
    socket.avatar = value.avatar;
    socket.emit("initSelfData", value);
  });

  socket.on("start", async () => {
    const ownRoom = ROOM.filter((e) => e.code === socket.code)[0];
    ROOM = ROOM.map((e) =>
      e.code === socket.code ? { ...e, isPlayed: true } : e
    );
    const ronde = 10;
    let currRonde = 1;
    const pertanyaans = peribahasa;
    io.to(socket.code).emit("start", { ronde: 1, countDown: 3000 });

    const interval = setInterval(() => {
      if (currRonde === 11) {
        clearInterval(interval);
        return;
      }
    }, 8000);
  });

  socket.on("getAllRoom", (keyword) => {
    let temp = [];
    if (keyword) {
      temp = ROOM.filter((e) => e.name.includes(keyword));
    } else {
      temp = ROOM;
    }
    socket.emit("sendRoom", temp);
  });
  socket.on("peringkat", () => {
    ROOM.map((e) => {
      if (e.code === socket.code) {
        let temp = e.players;
        temp = temp.sort(function (a, b) {
          return parseInt(b.score) - parseInt(a.score);
        });
        return socket.emit("peringkat", temp);
      }
    });
  });
  socket.on("member", () => {
    ROOM.map((e) => {
      if (e.code === socket.code) {
        console.log(e);
        let temp = e.players;
        return socket.emit("member", temp);
      }
    });
  });

  socket.on("buatRoom", (data) => {
    console.log(data);
    let code = makeid(4);
    let temp = {
      name: data.nama,
      code,
      players: [
        {
          name: socket.username,
          score: 0,
          socket: JSON.stringify(socket.id),
          isRM: true,
          avatar: socket.avatar,
        },
      ],
      room_icon: data.room_icon,
      max: data.jml,
      category: data.kategori,
      isPlayed: false,
      ronde: 0,
    };
    temp.question = getQuestionsByCategory(data.kategori);
    ROOM.push(temp);
    socket.join(code);
    let logs = {
      type: "notif",
      text: ": Anda Berhasil Membuat Room",
    };
    socket.emit("msg", logs);
    socket.emit("msg", {
      type: "notif",
      text: ": Anda Menjadi Room Master",
    });
    socket.emit("rm");
    io.to(code).emit("initRoom", temp);
    socket.code = code;
    socket.emit("success-join", code);
  });

  function theGame() {
    ROOM = ROOM.map((e) => {
      if (e.code === socket.code) {
        let isPlayed = true;
        let round = 0;
        let question = e?.question;
        if (parseInt(e.round) > -1) {
          round = e.round + 1;
        }

        let BASE_DURATION = 20;
        let duration = 30;
        const currQuestion = generateSoal(peribahasa);
        io.to(e.code).emit("game-dimulai", {
          question: currQuestion,
          duration: duration,
          round: round,
        });
        io.to(e.code).emit("msg", {
          type: "notif",
          text: ": Ronde " + (round + 1) + " Dimulai! Persiapkan diri.",
        });

        let counter = 0;
        let interval = null;
        setTimeout(() => {
          interval = setInterval(() => {
            counter += 0.1;
            io.to(e.code).emit("countdown", counter);
            if (counter >= duration) {
              clearInterval(interval);
              io.to(e.code).emit("msg", {
                type: "notif",
                text: ": Ronde " + (round + 1) + " Berakhir!.",
              });

              console.log("rondee", round);

              if (round <= 8) {
                io.to(e.code).emit("round-end");
                io.to(e.socketMaster).emit("next-round");
              } else {
                io.to(e.code).emit("game-end");
                io.to(e.code).emit("msg", {
                  type: "notif",
                  text: ": Permainan Berakhir!.",
                });
                isPlayed = false;
              }
            }
          }, 100);

          io.to(e.code).emit("round-start", counter);
        }, 5500);

        return {
          ...e,
          isPlayed: isPlayed,
          currQuestion,
          round: round,
        };
      }

      return e;
    });
  }

  socket.on("mulai-game", () => {
    theGame();
  });
  socket.on("msg", ({ text }) => {
    io.to(socket.code).emit("msg", {
      type: "msg",
      text: socket.username + " : " + text,
    });
  });
  socket.on("masukRoom", (code) => {
    if (code) {
      ROOM = ROOM.map((e) => {
        if (e.code === code) {
          socket.join(code);
          let temp = {};
          let logs = {
            type: "notif",
            text: ": " + socket.username + " Memasuki Room",
          };
          temp = {
            ...e,
            players: [
              ...e.players,
              {
                name: socket.username,
                score: 0,
                socket: JSON.stringify(socket.id),
                isRM: e.players.length === 0,
                avatar: socket.avatar,
              },
            ],
          };

          io.to(code).emit("msg", logs);

          if (e.players.length === 0) {
            temp.question = getQuestionsByCategory(e.category);
            temp.isPlayed = false;
            temp.roomMaster = socket.username;
            temp.socketMaster = JSON.stringify(socket.id);
            socket.emit("rm");
            socket.emit("msg", {
              type: "notif",
              text: ": Anda Menjadi Room Master",
            });
          }

          io.to(code).emit("initRoom", temp);
          socket.code = e.code;

          socket.emit("success-join", e.code);
          return temp;
        } else {
          return e;
        }
      });
    }
  });

  socket.on("betul", function (data) {
    console.log(data);
    console.log();

    ROOM = ROOM.map((e) => {
      if (e.code === socket.code) {
        let players = e.players.map((player) => {
          if (player.socket == JSON.stringify(socket.id)) {
            let plus = Math.round(
              (data.countDown - data.timeleft) * (e.round + 1) * 10
            );
            let score = player.score + plus;
            socket.emit("msg", {
              type: "notif",
              text: ": Score anda bertambah sebanyak +" + plus,
            });
            return { ...player, score: Math.round(score) };
          }
          return player;
        });

        return { ...e, players: players };
      } else {
        return e;
      }
    });
  });

  socket.on("keluar-room", () => {
    ROOM = ROOM.map((e) => {
      if (e.code === socket.code) {
        if (e.players.length === 1) {
          return {
            ...e,
            players: e.players.filter((e) => e.name !== socket.username),
            isPlayed: false,
            round: 0,
          };
        }
        let logs = {
          type: "notif",
          text: ": " + socket.username + " Keluar dari Room",
        };
        io.to(socket.code).emit("msg", logs);
        socket.emit("username", socket.username);
        const players = e.players.filter((e) => e.name !== socket.username);
        const temp = { ...e, players: players };
        io.to(socket.code).emit("initRoom", temp);
        socket.code = null;
        return temp;
      } else {
        return e;
      }
    });
  });

  socket.on("disconnect", () => {
    if (socket.code) {
      ROOM = ROOM.map((e) => {
        if (e.code === socket.code) {
          if (e.players.length === 1) {
            return {
              ...e,
              players: e.players.filter((e) => e.name !== socket.username),
              isPlayed: false,
              round: 0,
            };
          }
          let logs = {
            type: "notif",
            text: ": " + socket.username + " Keluar dari Room",
          };
          io.to(socket.code).emit("msg", logs);
          const players = e.players.filter((e) => e.name !== socket.username);
          const temp = { ...e, players: players };
          io.to(socket.code).emit("initRoom", temp);
          return temp;
        } else {
          return e;
        }
      });
    }
  });
});
