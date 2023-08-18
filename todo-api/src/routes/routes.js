import Router from "koa-router";
import * as todoHandler from "../handlers/todoHandlers";
import todoInputMiddleware from "../middleware/todoInputMiddleware";

// Prefix all routes with /books
const router = new Router({
  prefix: "/api",
});

// Routes will go here

router.get("/todoes", todoHandler.getTodoes);
// router.get("/todoes/:id", bookHandler.getBook);
router.post("/todo", todoInputMiddleware, todoHandler.createTd);
router.put("/todo", todoHandler.toggle);
router.put("/todoes", todoHandler.toggleMultiple);
router.delete("/todo/:id", todoHandler.remove);
router.delete("/todoes", todoHandler.removeMultiple);

export default router;
