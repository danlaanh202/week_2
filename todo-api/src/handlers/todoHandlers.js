import {
  getTodoById,
  createTodo,
  getAlltodos,
  toggleTodo,
  removeTodo,
  removeMultipletodos,
  completeMultipletodos,
} from "../database/todoRepository";

export async function getTodo(ctx) {
  try {
    const { id } = ctx.request.params;
    const todo = getTodoById(id);
    return (ctx.body = {
      data: todo,
      success: true,
    });
  } catch (error) {
    ctx.status = 500;
    return (ctx.body = {
      success: false,
      data: [],
      error: e.message,
    });
  }
}
export async function getTodos(ctx) {
  try {
    const todos = await getAlltodos();
    ctx.status = 200;
    return (ctx.body = {
      data: todos,
      success: true,
    });
  } catch (e) {
    ctx.status = 500;
    return (ctx.body = {
      success: false,
      data: [],
      error: e.message,
    });
  }
}

export async function createTd(ctx) {
  try {
    const data = await createTodo(ctx.request.body);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
      data,
    });
  } catch (e) {
    ctx.status = 500;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

export async function toggle(ctx) {
  try {
    const { id } = ctx.params;
    if (id) await toggleTodo([id]);
    const { ids } = ctx.request.body;
    if (ids) await toggleTodo(ids);
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
export async function remove(ctx) {
  try {
    const { id } = ctx.params;
    if (id) await removeTodo([id]);
    const { ids } = ctx.request.body;
    if (ids) await removeTodo(ids);
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
// export async function toggleMultiple(ctx) {
//   try {
//     const { ids } = ctx.request.body;
//     await toggleTodo(ids);
//     ctx.status = 200;
//     return (ctx.body = {
//       success: true,
//     });
//   } catch (error) {
//     return (ctx.body = {
//       success: false,
//       error: error.message,
//     });
//   }
// }
// export async function removeMultiple(ctx) {
//   try {
//     const { ids } = ctx.request.body;
//     await removeTodo(ids);
//     ctx.status = 200;
//     return (ctx.body = {
//       success: true,
//     });
//   } catch (error) {
//     return (ctx.body = {
//       success: false,
//       error: error.message,
//     });
//   }
// }
