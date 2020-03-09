const notes = [
  {
    id: 'note_id_1',
    text: 'text',
    tags: {
      first: {
        id: 'tag_id_1',
        name: 'fun'
      },
      other: [
        {
          id: 'tag_id_2',
          name: 'techy'
        },
      ]
    },
    date: 'date'
  },
  {
    id: 'note_id_2',
    text: 'text number 2',
    tags: {
      first: {
        id: 'tag_id_3',
        name: 'movie'
      },
      other: [
        {
          id: 'tag_id_1',
          name: 'fun'
        },
      ]
    },
    date: 'date'
  },
  {
    id: 'note_id_3',
    text: 'text for note 3',
    tags: {
      first: {
        id: 'tag_id_2',
        name: 'techy'
      },
      other: [
        {
          id: 'tag_id_3',
          name: 'movie'
        },
        {
          id: 'tag_id_1',
          name: 'fun'
        },
      ]
    },
    date: 'date'
  },
  {
    id: 'note_id_4',
    text: '4th note text',
    tags: {
      first: {
        id: 'tag_id_1',
        name: 'fun'
      },
      other: [
        {
          id: 'tag_id_3',
          name: 'movie'
        },
        {
          id: 'tag_id_4',
          name: 'work'
        },
      ]
    },
    date: 'date'
  },
  {
    id: 'note_id_5',
    text: '4th note text',
    tags: {
      first: {
        id: 'tag_id_4',
        name: 'work'
      },
      other: [
        {
          id: 'tag_id_3',
          name: 'movie'
        },
        {
          id: 'tag_id_2',
          name: 'techy'
        },
      ]
    },
    date: 'date'
  }
]

module.exports = notes