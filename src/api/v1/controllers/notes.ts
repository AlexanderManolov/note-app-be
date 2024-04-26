import { Request, Response } from 'express-serve-static-core'
import db from '../../../db/Postgres'
import { validateMultiplePayload, validateSinglePayload } from '../../../models/notes'
import { NoteRequestBody } from '../../../types/notes'

export const getNotes = async (req: Request, res: Response) => {
	const notes = await db.notes.findMany()
	res.json({
		success: true,
		data: {
			notes: notes,
		},
	})
}

export const getNote = async (req: Request, res: Response) => {
	const id = Number(req.params.id)
	const note = await db.notes.findUnique({ where: { id } })

	if (!note) {
		res.status(404).json({
			success: false,
			errorMessage: `Can't find a note with id: ${req.params.id}`,
		})
		return
	}

	res.json({
		success: true,
		data: {
			notes: note,
		},
	})
}

export const createNote = async (req: Request, res: Response) => {
	const payload = validateMultiplePayload(req.body)
	if (payload.length === 0) {
		res
			.status(400)
			.json({ success: false, errorMessage: 'Invalid payload. Please, provide an array of notes.' })
		return
	}

	const notes = await db.notes.createMany({
		data: payload,
	})

	res.json({
		success: true,
		data: {
			notes: notes,
		},
	})
}

export const updateNote = async (req: Request, res: Response) => {
	const payload: NoteRequestBody | undefined = validateSinglePayload(req.body)

	if (!payload) {
		res.status(400).json({ success: false, errorMessage: 'Invalid payload' })
		return
	}

	let note
	try {
		note = await db.notes.update({
			where: {
				id: Number(req.params.id),
			},
			data: {
				title: payload.title,
				description: req.body.description,
			},
		})
	} catch (error) {
		console.error(error)
		res.status(404).json({
			success: false,
			errorMessage: `Can't find a note with id: ${req.params.id}`,
		})
		return
	}

	res.status(200).json({
		success: true,
		data: {
			note,
		},
	})
}

export const deleteNote = async (req: Request, res: Response) => {
	const id = Number(req.params.id)
	try {
		await db.notes.delete({ where: { id } })
		res.status(200).json({ success: true })
	} catch (error) {
		res.status(404).json({ success: false, errorMessage: 'Not found.' })
	}
}
