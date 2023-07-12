import cron from "node-cron";
const cronJobs = (socket) => {
  const notification = () => {
    cron.schedule("* * * * *", () => {
      console.log("Hello");
      socket.emit("notification", "Hello");
    });
  }
  return {
    notification
  }

}
export default cronJobs;
