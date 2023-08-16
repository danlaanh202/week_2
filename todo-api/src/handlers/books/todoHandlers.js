import {
  createTodo,
  getAllTodoes,
  removeTodo,
  removeMultipleTodoes,
  toggleTodo,
  toggleMultipleTodoes,
} from "../../database/todoRepository";

export async function getTodoes(ctx) {
  try {
    const todoes = getAllTodoes();
    ctx.status = 200;
    return (ctx.body = {
      data: todoes,
    });
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      data: [],
      error: e.message,
    });
  }
}

export async function createTd(ctx) {
  try {
    const data = ctx.request.body;
    createTodo({ ...data });

    ctx.status = 201;
    return (ctx.body = {
      success: true,
      data,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

export function remove(ctx) {
  try {
    const { id } = ctx.params;
    removeTodo(id);
    ctx.status = 204;
    return (ctx.body = {
      success: true,
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
}

export function toggle(ctx) {
  try {
    const { id } = ctx.params;
    toggleTodo(id);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
}
export function removeMultiple(ctx) {
  try {
    const { ids } = ctx.params;
    removeMultipleTodoes(ids);
    ctx.status = 204;
    return (ctx.body = {
      success: true,
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
}
export function toggleMultiple(ctx) {
  try {
    const { ids } = ctx.params;
    toggleMultipleTodoes(ids);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
}
