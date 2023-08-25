import Router from "koa-router";
import * as todoHandler from "../handlers/todoHandlers";
import todoInputMiddleware from "../middleware/todoInputMiddleware";

// Prefix all routes with /books
const router = new Router({
  prefix: "/api",
});

// Routes will go here

router.get("/todos", todoHandler.gettodos);
router.get("/todo/:id", todoHandler.getTodo);
router.post("/todo", todoInputMiddleware, todoHandler.createTd);
router.put("/todos", todoHandler.complete);
router.delete("/todos", todoHandler.remove);

// router.delete("/todo/:id", todoHandler.remove);
// router.put("/todo/:id", todoHandler.toggle);

export default router;
