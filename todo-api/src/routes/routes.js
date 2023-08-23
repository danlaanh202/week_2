import Router from "koa-router";
import * as todoHandler from "../handlers/todoHandlers";
import todoInputMiddleware from "../middleware/todoInputMiddleware";

// Prefix all routes with /books
const router = new Router({
  prefix: "/api",
});

// Routes will go here

router.get("/todoes", todoHandler.getTodoes);
router.get("/todo/:id", todoHandler.getTodo);
router.post("/todo", todoInputMiddleware, todoHandler.createTd);
router.put("/todoes", todoHandler.complete);
router.delete("/todoes", todoHandler.remove);

// router.delete("/todo/:id", todoHandler.remove);
// router.put("/todo/:id", todoHandler.toggle);

export default router;
