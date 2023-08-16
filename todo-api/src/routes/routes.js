import Router from "koa-router";
import * as todoHandler from "../handlers/books/todoHandlers";
import todoInputMiddleware from "../middleware/todoInputMiddleware";

// Prefix all routes with /books
const router = new Router({
  prefix: "/api",
});

// Routes will go here

router.get("/todoes", todoHandler.getTodoes);
// router.get("/todoes/:id", bookHandler.getBook);
router.post("/todoes", todoInputMiddleware, todoHandler.createTd);
router.put("/todoes/:id", todoHandler.toggle);
router.delete("/todoes/:id", todoHandler.remove);
router.delete("/todoes", todoHandler.removeAll);
router.post("/todoes/multiple_remove", todoHandler.removeMultiple);
router.put("/todoes/multiple_toggle", todoHandler.toggleMultiple);

export default router;
