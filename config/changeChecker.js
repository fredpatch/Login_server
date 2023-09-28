// // import connection module
// const con = require("./db");
// const sendPushNotification = require("./../utils/pushNotifications");

// const checkChanges = async () => {
//   const query =
//     "SELECT COUNT(*) AS change_count FROM change_log WHERE notified = 0";
//   let connection;

//   try {
//     connection = await con.getConnection();
//     const [results] = await con.execute(query);
//     const changeCount = results[0].change_count;

//     if (changeCount > 0) {
//       // console.log("Change count:", changeCount);

//       sendPushNotification(`You have ${changeCount} new changes.`);

//       // Mark the changes as notified
//       await con.execute(
//         "UPDATE change_log SET notified = 1 WHERE notified = 0"
//       );
//     }
//   } catch (error) {
//     console.error("Error checking for changes:", error);
//   } finally {
//     if (connection) {
//       connection.release();
//     }
//   }
// };
// module.exports = { checkChanges };

const con = require("./db");
const sendPushNotification = require("./../utils/pushNotifications");

const checkChanges = async () => {
  const query =
    "SELECT table_name, COUNT(*) AS change_count FROM change_log WHERE notified = 0 GROUP BY table_name";
  let connection;

  try {
    connection = await con.getConnection();
    const [results] = await con.execute(query);

    for (const result of results) {
      const { table_name, change_count } = result;
      sendPushNotification(
        `${change_count} row(s) changed in table: ${table_name}`
      );
    }

    // Mark all changes as notified
    await con.execute("UPDATE change_log SET notified = 1 WHERE notified = 0");
  } catch (error) {
    console.error("Error checking for changes:", error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

module.exports = { checkChanges };
