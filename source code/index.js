import express from "express";
import { createClient } from "@supabase/supabase-js";
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const supa = createClient(
  "https://vooxyyhncjtckpbzyxus.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvb3h5eWhuY2p0Y2twYnp5eHVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAwMDY2MDMsImV4cCI6MjAyNTU4MjYwM30.e2Sl_J1mbX4nfLjpJPUGOwD21yjLHf9c_HUJI_uNWTA"
);
app.get("/", (req, res) => {
  res.redirect("/index.ejs");
});

app.get("/index.ejs", (req, res) => {
  res.render("index.ejs", { authenticity: "valid" });
});

app.get("/signUp.ejs", (req, res) => {
  res.render("signUp.ejs", { existence: "new", text: "" });
});

app.get("/homePage.ejs", (req, res) => {
  const userName = req.url.split("=")[1];

  async function getData(userName) {
    try {
      const { data: userData } = await supa
        .from("users")
        .select("*")
        .eq("username", userName);

      const clan = userData[0]["clan"];

      const { data: clanData } = await supa
        .from("clans")
        .select("*")
        .eq("clanName", clan);
      const questDetails = clanData[0]["questDetails"];
      questDetails["questProgress"] =
        parseInt(questDetails["questProgress"]) + 10;

      const { data: taskData } = await supa
        .from(userName + "_tasks")
        .select("*")
        .order("id");

      var equipped = {
        sword: "empty",
        shield: "empty",
        armour: "empty",
        helmet: "empty",
      };
      if (userData[0]["equipped"]["sword"].length > 1) {
        equipped["sword"] = userData[0]["equipped"]["sword"];
      }
      if (userData[0]["equipped"]["shield"].length > 1) {
        equipped["shield"] = userData[0]["equipped"]["shield"];
      }
      if (userData[0]["equipped"]["armour"].length > 1) {
        equipped["armour"] = userData[0]["equipped"]["armour"];
      }
      if (userData[0]["equipped"]["helmet"].length > 1) {
        equipped["helmet"] = userData[0]["equipped"]["helmet"];
      }

      const league = userData[0]["league"];

      var attack;
      var persistence;
      var defence;
      var intelligence;

      if (equipped["sword"] != 0) {
        attack =
          league * 10 +
          10 * parseInt(equipped["sword"][equipped["sword"].length - 1]);
      } else {
        attack = league * 10;
      }
      if (equipped["shield"] != 0) {
        persistence =
          league * 10 +
          10 * parseInt(equipped["shield"][equipped["shield"].length - 1]);
      } else {
        persistence = league * 10;
      }
      if (equipped["armour"] != 0) {
        defence =
          league * 10 +
          10 * parseInt(equipped["armour"][equipped["armour"].length - 1]);
      } else {
        defence = league * 10;
      }
      if (equipped["helmet"] != 0) {
        intelligence =
          league * 10 +
          10 * parseInt(equipped["helmet"][equipped["helmet"].length - 1]);
      } else {
        intelligence = league * 10;
      }

      res.render("homePage.ejs", {
        coins: userData[0]["coins"],
        gems: userData[0]["gems"],
        equipped: equipped,
        attack: attack,
        persistence: persistence,
        defence: defence,
        intelligence: intelligence,
        taskData: taskData,
        numberOfTasks: taskData.length,
        league: userData[0]["league"],
        userName: userName,
        questDetails,
        exp: userData[0]["exp"],
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  getData(userName);
});

app.get("/shop.ejs", (req, res) => {
  const userName = req.url.split("=")[1];

  async function getData(userName) {
    try {
      const { data: userData } = await supa
        .from("users")
        .select("*")
        .eq("username", userName);

      const coins = userData[0]["coins"];
      const gems = userData[0]["gems"];
      const swords = userData[0]["swords"];
      const shields = userData[0]["shields"];
      const armours = userData[0]["armours"];
      const helmets = userData[0]["helmets"];

      var inventory = [];
      if (!(swords == undefined)) {
        inventory = inventory.concat(swords);
      }
      if (!(shields == undefined)) {
        inventory = inventory.concat(shields);
      }
      if (!(armours == undefined)) {
        inventory = inventory.concat(armours);
      }
      if (!(helmets == undefined)) {
        inventory = inventory.concat(helmets);
      }

      res.render("shop.ejs", {
        userName: userName,
        coins: coins,
        gems: gems,
        equipped: userData[0]["equipped"],
        inventory: inventory,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  getData(userName);
});

app.get("/inventory.ejs", (req, res) => {
  const userName = req.url.split("=")[1];
  async function getData(userName) {
    try {
      const { data: userData } = await supa
        .from("users")
        .select("*")
        .eq("username", userName);

      const coins = userData[0]["coins"];
      const gems = userData[0]["gems"];
      const swords = userData[0]["swords"];
      const shields = userData[0]["shields"];
      const armours = userData[0]["armours"];
      const helmets = userData[0]["helmets"];
      const quests = userData[0]["quests"];
      const clan = userData[0]["clan"];

      var equipped = {
        sword: "empty",
        shield: "empty",
        armour: "empty",
        helmet: "empty",
      };

      if (!userData[0]["equipped"]["sword"] == 0) {
        equipped["sword"] = userData[0]["equipped"]["sword"];
      }
      if (!userData[0]["equipped"]["shield"] == 0) {
        equipped["shield"] = userData[0]["equipped"]["shield"];
      }
      if (!userData[0]["equipped"]["armour"] == 0) {
        equipped["armour"] = userData[0]["equipped"]["armour"];
      }
      if (!userData[0]["equipped"]["helmet"] == 0) {
        equipped["helmet"] = userData[0]["equipped"]["helmet"];
      }

      var inventory = [];
      if (!(swords == undefined)) {
        inventory = inventory.concat(swords);
      }
      if (!(shields == undefined)) {
        inventory = inventory.concat(shields);
      }
      if (!(armours == undefined)) {
        inventory = inventory.concat(armours);
      }
      if (!(helmets == undefined)) {
        inventory = inventory.concat(helmets);
      }

      var itemStatsTypeUrl = [];
      for (var i = 0; i < inventory.length; i++) {
        if (inventory[i][(0, 2)]) {
          itemStatsTypeUrl.push("persistence");
        } else {
          switch (inventory[i][0]) {
            case "s":
              itemStatsTypeUrl.push("attack");
              break;

            case "a":
              itemStatsTypeUrl.push("defence");
              break;

            default:
              itemStatsTypeUrl.push("intelligence");
              break;
          }
        }
      }

      var questType = [];
      for (var i = 0; i < quests.length; i++) {
        switch (quests[i][0]) {
          case "B":
            questType.push("attack");
            break;
          case "H":
            questType.push("persistence");
            break;
          case "D":
            questType.push("defence");
            break;
          case "S":
            questType.push("intelligence");
            break;
          default:
            questType.push("empty");
            break;
        }
      }

      const { data: clanData } = await supa
        .from("clans")
        .select("*")
        .eq("clanName", clan);
      var questRunning = clanData[0]["questDetails"]["questName"];

      res.render("inventory.ejs", {
        userName: userName,
        coins: coins,
        gems: gems,
        equipped: equipped,
        inventory: inventory,
        itemStatsTypeUrl: itemStatsTypeUrl,
        quests: quests,
        questType: questType,
        questRunning: questRunning,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  getData(userName);
});

app.get("/clan.ejs", (req, res) => {
  const userName = req.url.split("=")[1];
  async function getData(userName) {
    try {
      const { data: userData } = await supa
        .from("users")
        .select("*")
        .eq("username", userName);

      const coins = userData[0]["coins"];
      const gems = userData[0]["gems"];
      const clanName = userData[0]["clan"];
      const quests = userData[0]["quests"];
      var playerJoined;
      var playerSolo;

      if (clanName == undefined) {
        playerJoined = "invisible";
        playerSolo = "visible";
        res.render("clan.ejs", {
          userName: userName,
          coins: coins,
          gems: gems,
          playerJoined: playerJoined,
          playerSolo: playerSolo,
        });
      } else {
        playerJoined = "visible";
        playerSolo = "invisible";
        const { data: clanData } = await supa
          .from("clans")
          .select("*")
          .eq("clanName", clanName);

        const clanBanner = clanData[0]["banner"];
        const clanLeader = clanData[0]["leader"];
        const clanMembers = clanData[0]["members"];
        var membersLeagues = [];
        for (var i = 0; i < clanMembers.length; i++) {
          const { data: userLeague } = await supa
            .from("users")
            .select("league")
            .eq("username", clanMembers[i]);
          membersLeagues.push(userLeague);
        }
        const questName = clanData[0]["questDetails"]["questName"];
        const questProgress = clanData[0]["questDetails"]["questProgress"];
        var questStart;
        if (questName != 0) {
          questStart = "allowed";
        } else {
          questStart = "denied";
        }
        var clanChat;
        if (clanData[0]["clanChat"] == undefined) {
          clanChat = [];
        } else {
          clanChat = clanData[0]["clanChat"];
        }
        const { data: example, error } = await supa
  .from('users')
  .select(`username,league,equipped`);
        console.log(example);
        res.render("clan.ejs", {
          userName: userName,
          coins: coins,
          gems: gems,
          playerJoined: playerJoined,
          playerSolo: playerSolo,
          clanBanner: clanBanner,
          clanName: clanName,
          clanLeader: clanLeader,
          clanMembers: clanMembers,
          membersLeagues: membersLeagues,
          quests: quests,
          questName: questName,
          questProgress: questProgress,
          questStart: questStart,
          clanChat: clanChat,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  getData(userName);
});

app.get("/profile.ejs", (req, res) => {
  const userName = req.url.split("=")[1];
  res.render("profile.ejs", { userName: userName });
});

app.post("/index.ejs", (req, res) => {
  const inputEmail = req.body.email;
  const inputPassword = req.body.password;
  async function checkLogin(inputEmail, inputPassword) {
    try {
      const { data: Data } = await supa
        .from("users")
        .select("*")
        .match({ email: inputEmail, password: inputPassword });
      if (Data.length != 0) {
        const userName = Data[0]["username"];
        res.redirect("/homePage.ejs?=" + userName);
      } else {
        res.render("index.ejs", { authenticity: "invalid" });
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  checkLogin(inputEmail, inputPassword);
});

app.post("/signUp.ejs", (req, res) => {
  const inputUserName = req.body.userName;
  const inputEmail = req.body.email;
  const inputPassword = req.body.password;
  const inputConfirmPassword = req.body.confirmPassword;
  async function checkLogin(
    inputUserName,
    inputEmail,
    inputPassword,
    inputConfirmPassword
  ) {
    try {
      const { data: userNameData } = await supa
        .from("users")
        .select("*")
        .eq("username", inputUserName);
      const { data: emailData } = await supa
        .from("users")
        .select("*")
        .eq("email", inputEmail);
      if (userNameData.length != 0) {
        res.render("signUp.ejs", {
          existence: "old",
          text: "Username already in use!",
        });
      } else if (emailData.length != 0) {
        res.render("signUp.ejs", {
          existence: "old",
          text: "Email is already registered!",
        });
      } else {
        if (inputPassword != inputConfirmPassword) {
          res.render("signUp.ejs", {
            existence: "old",
            text: "Passwords don't match!",
          });
        } else if (inputPassword.length < 4) {
          res.render("signUp.ejs", {
            existence: "old",
            text: "Password should be 4+ characters!",
          });
        } else {
          const { data: kya } = await supa.from("users").insert({
            username: inputUserName,
            email: inputEmail.toLowerCase(),
            password: inputPassword,
          });
          res.redirect("/index.ejs");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  checkLogin(inputUserName, inputEmail, inputPassword, inputConfirmPassword);
});

app.post("/homePage.ejs", (req, res) => {
  const userName = req.url.split("=")[1];
  const newTask = req.body.task;
  const questDetails = req.body.questDetails;
  const coins = parseFloat(parseFloat(req.body.coins).toFixed(2));
  const gems = parseFloat(parseFloat(req.body.gems).toFixed(2));
  const exp = parseFloat(parseFloat(req.body.exp).toFixed(2));

  var checkbox = ["no checkbox is selected"];
  if (req.body.checkbox) {
    checkbox = req.body.checkbox;
    if (typeof checkbox == "string") {
      var taskCompleted = [];
      taskCompleted.push(checkbox.slice(8));
    } else {
      var i = 0;
      var taskCompleted = [];
      while (i < checkbox.length) {
        taskCompleted.push(checkbox[i].slice(8));
        i++;
      }
    }
  } else {
    var taskCompleted = [];
  }
  async function saveChanges(userName) {
    try {
      const { data: data } = await supa
        .from("users")
        .update({ coins: coins, gems: gems, exp: exp })
        .eq("username", userName);
      await supa
        .from(userName + "_tasks")
        .delete()
        .neq("id", 0);
      i = 0;

      while (i < newTask.length) {
        if (newTask[i] == "New Task") {
          i++;
          continue;
        } else {
          if (taskCompleted.includes((i + 1).toString())) {
            await supa.from(userName + "_tasks").insert({
              id: i + 1,
              task: newTask[i],
              task_done: true,
            });
          } else {
            await supa.from(userName + "_tasks").insert({
              id: i + 1,
              task: newTask[i],
              task_done: false,
            });
          }
          i++;
        }
      }
    } catch (error) {
      console.log(error.message);
    }
    res.redirect("/homePage.ejs?=" + userName);
  }
  saveChanges(userName);
});

app.post("/shop.ejs", (req, res) => {
  const userName = req.url.split("=")[1];

  if (req.body["itemAction"] != undefined) {
    const itemGroup = req.body["itemAction"].split("_")[0];
    const action = req.body["itemAction"].split("_")[1];
    const itemChanged = req.body["itemAction"].split("_")[2];

    var itemType;
    switch (itemGroup) {
      case "group1":
        itemType = "sword";
        break;
      case "group2":
        itemType = "shield";
        break;
      case "group3":
        itemType = "armour";
        break;
      default:
        itemType = "helmet";
        break;
    }

    async function itemOperations(userName) {
      try {
        const { data: userData } = await supa
          .from("users")
          .select("*")
          .eq("username", userName);

        var oldEquipped = userData[0]["equipped"];

        if (action == "equip") {
          oldEquipped[itemType] = itemChanged;

          const { data: data } = await supa
            .from("users")
            .update({ equipped: oldEquipped })
            .eq("username", userName);
        } else if (action == "remove") {
          oldEquipped[itemType] = 0;
          const { data: data } = await supa
            .from("users")
            .update({ equipped: oldEquipped })
            .eq("username", userName);
        } else {
          const coins = parseInt(req.body.coins);
          const price = parseInt(req.body["itemAction"].split("_")[3]);
          oldEquipped[itemType] = itemChanged;
          if (!(coins - price < 0)) {
            var newItemList = [];
            if (!(userData[0][itemType + "s"] == undefined)) {
              for (var i = 0; i < userData[0][itemType + "s"].length; i++) {
                newItemList.push(userData[0][itemType + "s"][i]);
              }
            }
            newItemList.push(itemChanged);
            switch (itemGroup) {
              case "group1":
                const { data: data } = await supa
                  .from("users")
                  .update({
                    swords: newItemList,
                    coins: coins - price,
                    equipped: oldEquipped,
                  })
                  .eq("username", userName);
                break;
              case "group2":
                await supa
                  .from("users")
                  .update({
                    shields: newItemList,
                    coins: coins - price,
                    equipped: oldEquipped,
                  })
                  .eq("username", userName);
                break;
              case "group3":
                await supa
                  .from("users")
                  .update({
                    armours: newItemList,
                    coins: coins - price,
                    equipped: oldEquipped,
                  })
                  .eq("username", userName);
                break;
              case "group4":
                await supa
                  .from("users")
                  .update({
                    helmets: newItemList,
                    coins: coins - price,
                    equipped: oldEquipped,
                  })
                  .eq("username", userName);
                break;
              default:
                console.log("some error!");
                break;
            }
          }
        }
      } catch (error) {
        console.log(error.message);
      }
      res.redirect("/shop.ejs?=" + userName);
    }
    itemOperations(userName);
  } else {
    const coins = parseInt(req.body.coins);
    const gems = parseInt(req.body.gems);
    const price = parseInt(req.body["buyCoins"].split("_")[3]);
    const newCoins = coins + parseInt(req.body["buyCoins"].split("_")[2]);

    async function buyCoins(userName) {
      try {
        await supa
          .from("users")
          .update({ coins: newCoins, gems: gems - price })
          .eq("username", userName);
      } catch (error) {
        console.log(error);
      }
      res.redirect("/shop.ejs?=" + userName);
    }
    if (!(gems - price < 0)) {
      buyCoins(userName);
    } else {
      res.redirect("/shop.ejs?=" + userName);
    }
  }
});

app.post("/inventory.ejs", (req, res) => {
  const userName = req.url.split("=")[1];
  const action = req.body.button.split("_")[0];
  const itemType = req.body.button.split("_")[1];
  const item = req.body.button.split("_")[2];

  async function setItems(userName) {
    if (action == "equip") {
      const { data: userData } = await supa
        .from("users")
        .select("*")
        .eq("username", userName);
      var oldEquipped = userData[0]["equipped"];
      oldEquipped[itemType] = item;
      await supa
        .from("users")
        .update({ equipped: oldEquipped })
        .eq("username", userName);
      res.redirect("/inventory.ejs?=" + userName);
    } else {
      const { data: userData } = await supa
        .from("users")
        .select("*")
        .eq("username", userName);

      var oldEquipped = userData[0]["equipped"];
      oldEquipped[itemType] = 0;

      await supa
        .from("users")
        .update({ equipped: oldEquipped })
        .eq("username", userName);
      res.redirect("/inventory.ejs?=" + userName);
    }
  }
  setItems(userName);
});

app.post("/quest", (req, res) => {
  const userName = req.body["userName"];
  const action = req.body["questButton"].split("_")[0];
  const questName = req.body["questButton"].split("_")[1];
  const cost = req.body["questButton"].split("_")[2];
  const gems = req.body["gems"];
  const clanName = req.body["clanName"];

  async function setData(userName, action, questName, clanName) {
    try {
      if (action == "start") {
        const { data: clanData } = await supa
          .from("clans")
          .select("questDetails")
          .eq("clanName", clanName);
        const questDetails = clanData[0]["questDetails"];
        questDetails["questName"] = questName;
        await supa
          .from("clans")
          .update({ questDetails: questDetails })
          .eq("clanName", clanName);
      } else if (action == "stop") {
        const { data: clanData } = await supa
          .from("clans")
          .select("questDetails")
          .eq("clanName", clanName);
        const questDetails = clanData[0]["questDetails"];
        questDetails["questName"] = 0;
        questDetails["questProgress"] = 0;
        await supa
          .from("clans")
          .update({ questDetails: questDetails })
          .eq("clanName", clanName);
      } else {
        const { data: userData } = await supa
          .from("users")
          .select("*")
          .eq("username", userName);
        var quests = userData[0]["quests"];
        quests.push(questName);
        await supa
          .from("users")
          .update({ gems: gems - cost, quests: quests })
          .eq("username", userName);
      }
    } catch (error) {
      console.log(error);
    }
  }
  setData(userName, action, questName, clanName);
  res.redirect("/clan.ejs?=" + userName);
});

app.post("/sendMessage", (req, res) => {
  const userName = req.body["userName"];
  const clanName = req.body["clanName"];
  const newChatMessage = req.body["newChatMessage"];
  const message = userName + "~" + newChatMessage;
  async function setNewMessage(userName, message) {
    try {
      if (newChatMessage.length > 0) {
        const { data: clanData } = await supa
          .from("clans")
          .select("clanChat")
          .eq("clanName", clanName);
        const clanChatList = clanData[0]["clanChat"];
        if (clanChatList.length >= 10) {
          clanChatList.pop();
        }
        clanChatList.unshift(message);
        await supa
          .from("clans")
          .update({ clanChat: clanChatList })
          .eq("clanName", clanName);
      }
    } catch (error) {
      console.log(error);
    }
  }
  setNewMessage(userName, message);
  res.redirect("/clan.ejs?=" + userName);
});

app.post("/clanHomePage", (req, res) => {
  const userName = req.body["userName"];
  const clanName = req.body["clanName"];

  async function removePlayer(userName, removePlayerName, clanName) {
    try {
      const { data: clanData } = await supa
        .from("clans")
        .select("*")
        .eq("clanName", clanName);
      const members = clanData[0]["members"];
      let removePlayer = removePlayerName;
      let index = members.indexOf(removePlayer);
      members.splice(index, 1);
      await supa
        .from("clans")
        .update({ members: members })
        .eq("clanName", clanName);
      await supa
        .from("users")
        .update({ clan: "" })
        .eq("username", removePlayerName);
    } catch (error) {
      console.log(error);
    }
  }

  async function leaveClan(userName, clanName) {
    const { data: clanData } = await supa
      .from("clans")
      .select("*")
      .eq("clanName", clanName);

    const leader = clanData[0]["leader"];
    const members = clanData[0]["members"];

    if (leader == userName) {
      for (var i = 0; i < members.length; i++) {
        await supa
          .from("users")
          .update({ clan: "" })
          .eq("username", members[i]);
      }

      await supa.from("clans").delete().eq("clanName", clanName);
    } else {
      let index = members.indexOf(userName);
      members.splice(index, 1);

      await supa.from("users").update({ clan: "" }).eq("username", userName);

      await supa
        .from("clans")
        .update({ members: members })
        .eq("clanName", clanName);
    }
  }

  if (req.body["leaveClan"] == undefined) {
    const removePlayerName = req.body["removePlayer"].split("_")[1];
    removePlayer(userName, removePlayerName, clanName);
  } else {
    leaveClan(userName, clanName);
  }

  res.redirect("/clan.ejs?=" + userName);
});

app.listen(3000, (req, res) => {
  console.log("working on port 3000!");
});
