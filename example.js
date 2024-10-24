const error = {
  errors: {
    content: {
      name: 'ValidatorError',
      message: 'Path `content` is required.',
      properties: {
        message: 'Path `content` is required.',
        type: 'required',
        path: 'content',
      },
      kind: 'required',
      path: 'content',
    },
    name: {
      name: 'ValidatorError',
      message: 'Path `name` is required.',
      properties: {
        message: 'Path `name` is required.',
        type: 'required',
        path: 'name',
      },
      kind: 'required',
      path: 'name',
    },
  },
  _message: 'Book validation failed',
  name: 'ValidationError',
  message:
    'Book validation failed: content: Path `content` is required., name: Path `name` is required.',
};

console.log(Object.values(error.errors).map((item) => item.message));
