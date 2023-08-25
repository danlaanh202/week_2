import Router from "koa-router";
import * as todoHandler from "../handlers/todoHandlers";
import todoInputMiddleware from "../middleware/todoInputMiddleware";

// Prefix all routes with /books
const router = new Router({
  prefix: "/api",
});

// Routes will go here

router.get("/todos", todoHandler.getTodos);
router.get("/todo/:id", todoHandler.getTodo);
router.post("/todo", todoInputMiddleware, todoHandler.createTd);
router.delete("/todo/:id", todoHandler.remove);
router.put("/todo/:id", todoHandler.toggle);
router.put("/todos", todoHandler.ToggleCompleteMultiple);
router.delete("/todos", todoHandler.removeMultiple);

export default router;
