import express from "express";
import play from "./js/play.js";
import boardIsCorrect from "./js/boardIsCorrect.js";
import symbolPlay from "./js/symbolPlay.js";

const app = express();

// GET /move?board=[0,1,0,2,0,0,0,0,0]
app.get('/move', (req, res) => {
    let boardParam = req.query.board;
    let board;

    // Validar que sea un array JSON
    try {
        board = JSON.parse(boardParam);
    } catch (e) {
        return res.status(400).json({ error: 'Parámetro board inválido. Debe ser un array JSON.' });
    }

    // Validar tablero
    if (!boardIsCorrect(board)) {
        return res.status(400).json({ error: 'El tablero no es válido.' });
    }

    // Guardar copia del tablero original
    const originalBoard = [...board];

    // Calcular mejor jugada con minimax
    const bestMove = play(board);
    if (bestMove === null) {
        return res.status(400).json({ error: 'No hay movimientos disponibles.' });
    }

    // Determinar qué símbolo juega
    const symbol = symbolPlay(board); // "X" o "O"
    const value = symbol === "X" ? 1 : 2;

    // Insertar jugada en el tablero
    board[bestMove] = value;

    // Respuesta detallada
    return res.json({
        simbolo: symbol,
        tableroOriginal: originalBoard,
        movimiento: bestMove,
        tableroNuevo: board
    });
});

// Exportar la app para Jest
export default app;
