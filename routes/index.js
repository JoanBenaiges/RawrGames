module.exports = app => {
    const indexRoutes = require("./index.routes")
    app.use("/", indexRoutes)

    const gamesRoutes = require("./games.routes")
    app.use("/games", gamesRoutes)

    const usersRoutes = require("./users.routes")
    app.use("/users", usersRoutes)

    const eventsRoutes = require("./events.routes")
    app.use("/events", eventsRoutes)

    const authRoutes = require("./auth.routes")
    app.use("/auth", authRoutes)

    const mapRoutes = require("./maps.routes")
    app.use("/", mapRoutes)

    const apiRoutes = require("./api.routes")
    app.use("/api", apiRoutes)
}