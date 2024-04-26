import { Request, Response } from 'express-serve-static-core'

export const validateRecordId = (req: Request, res: Response, next: Function) => {
  const id = Number(req.params.id)
	if (isNaN(id)) {
		res.status(400).json({
			success: false,
			errorMessage: `Invalid :id parameter.`,
		})
		return
	}

  next()
}
