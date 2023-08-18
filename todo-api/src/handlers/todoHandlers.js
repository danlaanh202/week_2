import {
  createTodo,
  getAllTodoes,
  removeTodo,
  removeMultipleTodoes,
  toggleTodo,
  toggleMultipleTodoes,
} from "../database/todoRepository";

export async function getTodoes(ctx) {
  try {
    const todoes = getAllTodoes();
    ctx.status = 200;
    return (ctx.body = {
      data: todoes,
      success: true,
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
    createTodo(data);

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

export async function remove(ctx) {
  try {
    const { id } = ctx.params;
    removeTodo(id);
    ctx.status = 200;
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

export async function toggle(ctx) {
  try {
    const { id } = JSON.parse(ctx.request.body);

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

export async function toggleMultiple(ctx) {
  try {
    const { ids } = JSON.parse(ctx.request.body);
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
export async function removeMultiple(ctx) {
  try {
    const { ids } = ctx.query;
    // console.log(instanceof ids)
    const idsParam = Array.isArray(ids) ? ids : [ids];
    removeMultipleTodoes(idsParam);
    ctx.status = 200;
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
