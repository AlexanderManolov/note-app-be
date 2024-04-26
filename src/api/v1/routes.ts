import { Router } from 'express'
import { getNotes, getNote, createNote, updateNote, deleteNote } from './controllers/notes'
import { validateRecordId } from './controllers/utils'

const MainRouter = Router()

MainRouter.use((_req, _res, next) => {
  console.log('Time: ', new Date().toTimeString())
  next()
})

MainRouter.get('/notes', getNotes)
MainRouter.get('/notes/:id', validateRecordId, getNote)
MainRouter.post('/notes', createNote)
MainRouter.put('/notes/:id', validateRecordId, updateNote)
MainRouter.delete('/notes/:id', validateRecordId, deleteNote)


export default MainRouter
