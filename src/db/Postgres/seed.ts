import db from '.'

const main = async () => {
  await db.notes.deleteMany({})

  const notes = await db.notes.createMany({
    data: [
      {
        title: 'ToDo',
        description: '1. Create a note app.',
      },
      {
        title: 'ToDo',
        description: '1. Create a note app.',
      },
    ],
  })

  return notes
}

main()
  .then((notes) => {
    console.log('DB seeded successfully.')
    console.log(notes)
    process.exit(0)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => {
    (async () => {
      await db.$disconnect()
    })()
  })
