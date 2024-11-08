"use strict";

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: API for managing todos
 */

/**
 * @swagger
 * /todo:
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: List of todos retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Todos retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Todo ID
 *                         example: "64d2fa9e89fa6d3eecdfef8b"
 *                       text:
 *                         type: string
 *                         description: Todo text content
 *                         example: "Learn Swagger"
 *                       completed:
 *                         type: boolean
 *                         description: Whether the todo is completed or not
 *                         example: false
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Creation timestamp
 *                         example: "2023-08-01T10:30:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Last update timestamp
 *                         example: "2023-08-01T10:30:00Z"
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /todo:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: Text content for the todo
 *                 example: "Finish the project"
 *     responses:
 *       201:
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Todo created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Todo ID
 *                       example: "64d2fa9e89fa6d3eecdfef8b"
 *                     text:
 *                       type: string
 *                       description: Todo text content
 *                       example: "Finish the project"
 *                     completed:
 *                       type: boolean
 *                       description: Whether the todo is completed or not
 *                       example: false
 *       400:
 *         description: Bad request, invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /todo/{id}:
 *   get:
 *     summary: Get a specific todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The todo ID
 *     responses:
 *       200:
 *         description: Todo retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Todo retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Todo ID
 *                       example: "64d2fa9e89fa6d3eecdfef8b"
 *                     text:
 *                       type: string
 *                       description: Todo text content
 *                       example: "Learn Swagger"
 *                     completed:
 *                       type: boolean
 *                       description: Whether the todo is completed or not
 *                       example: false
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /todo/{id}:
 *   put:
 *     summary: Update a specific todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The todo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: New text content for the todo
 *                 example: "Updated project task"
 *               completed:
 *                 type: boolean
 *                 description: Whether the todo is completed or not
 *                 example: true
 *     responses:
 *       202:
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Todo updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Todo ID
 *                       example: "64d2fa9e89fa6d3eecdfef8b"
 *                     text:
 *                       type: string
 *                       description: Todo text content
 *                       example: "Updated project task"
 *                     completed:
 *                       type: boolean
 *                       description: Whether the todo is completed or not
 *                       example: true
 *       400:
 *         description: Bad request, invalid input
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /todo/{id}:
 *   delete:
 *     summary: Delete a specific todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The todo ID
 *     responses:
 *       204:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal server error
 */

const express = require("express");
const router = express.Router();

const TodoController = require("../controllers/todoController");

const { list, create, read, update, delete: deleteTodo } = TodoController;

router.route("/").get(list).post(create);

router.route("/:id").get(read).put(update).delete(deleteTodo);

module.exports = router;
