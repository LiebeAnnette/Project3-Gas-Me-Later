import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import tripRoutes from "./routes/tripRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";

dotenv.config();

const startServer = async () => {
  const app = express();

  const PORT = process.env.PORT || 3001;

  app.use(cors());
  app.use(express.json());

  // Mount REST API routes
  app.use("/api/auth", authRoutes);
  app.use("/api/trips", tripRoutes);
  app.use("/api/stats", statsRoutes);
  app.use("/api/stats", reportRoutes);

  // Apollo Server setup
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }: { req: express.Request | undefined }) => {
      if (!req) {
        throw new Error("Request object is missing from context");
      }
      return { req };
    },
  });

  await server.start();
  server.applyMiddleware({ app: app as any });

  // Serve frontend in production
  if (process.env.NODE_ENV === "production") {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const clientPath = path.join(__dirname, "..", "..", "client", "dist");

    app.use(express.static(clientPath));
    app.get("*", (_req, res) =>
      res.sendFile(path.join(clientPath, "index.html"))
    );
  }

  // Default route
  app.get("/", (_req, res) => {
    res.send("Gas Me Later Backend is running!");
  });

  // Connect to MongoDB and start server
  mongoose
    .connect(
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/gas-me-later"
    )
    .then(() => {
      console.log("MongoDB connected!");
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(
          `GraphQL running at http://localhost:${PORT}${server.graphqlPath}`
        );
      });
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
};

startServer();
