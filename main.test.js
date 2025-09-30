import request from "supertest";
import app from "../main.js";

describe("API /move", () => {
  test("1. Devuelve 400 si falta el parámetro board", async () => {
    const res = await request(app).get("/move");
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/inválido/i);
  });

  test("2. Devuelve 400 si board no es JSON válido", async () => {
    const res = await request(app).get("/move?board=noEsJson");
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/inválido/i);
  });

  test("3. Devuelve 400 si el tablero no es válido (longitud incorrecta)", async () => {
    const res = await request(app).get("/move?board=" + JSON.stringify([1, 2, 3]));
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/no es válido/i);
  });

  test("4. Devuelve 400 si no hay movimientos disponibles (tablero lleno)", async () => {
    const fullBoard = [1, 2, 1, 2, 1, 2, 2, 1, 2];
    const res = await request(app).get("/move?board=" + JSON.stringify(fullBoard));
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/No hay movimientos/i);
  });

  test("5. Devuelve 200 con la mejor jugada en un tablero vacío", async () => {
    const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const res = await request(app).get("/move?board=" + JSON.stringify(board));
    expect(res.status).toBe(200);
    expect(res.body.movimiento).toBeGreaterThanOrEqual(0);
    expect(res.body.movimiento).toBeLessThan(9);
  });

  test("6. Incluye el símbolo correcto en la respuesta (X u O)", async () => {
    const board = [1, 2, 1, 0, 0, 0, 0, 0, 0];
    const res = await request(app).get("/move?board=" + JSON.stringify(board));
    expect(["X", "O"]).toContain(res.body.simbolo);
  });

  test("7. El tableroOriginal se mantiene intacto", async () => {
    const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const res = await request(app).get("/move?board=" + JSON.stringify(board));
    expect(res.body.tableroOriginal).toEqual(board);
  });

  test("8. El tableroNuevo refleja el movimiento realizado", async () => {
    const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const res = await request(app).get("/move?board=" + JSON.stringify(board));
    expect(res.body.tableroNuevo).not.toEqual(board);
    expect(res.body.tableroNuevo).toContain(res.body.simbolo === "X" ? 1 : 2);
  });

  test("9. No debe jugar en una casilla ya ocupada", async () => {
    const board = [1, 0, 0, 0, 0, 0, 0, 0, 0];
    const res = await request(app).get("/move?board=" + JSON.stringify(board));
    expect(res.body.movimiento).not.toBe(0);
  });

  test("10. Responde en menos de 200 ms", async () => {
    const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const start = Date.now();
    await request(app).get("/move?board=" + JSON.stringify(board));
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(200);
  });
});
