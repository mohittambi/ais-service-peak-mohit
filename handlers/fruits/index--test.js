const listFruits = require('./list-fruit');
const createFruit = require('./create-fruit');
const getFruit = require('./get-fruit');
const editFruit = require('./edit-fruit');
const deleteFruit = require('./delete-fruit');

const userRoutes = (event, callback) => {
  const { task } = event.pathParameters;
  const method = event.httpMethod.toLowerCase();

  if (method === 'get' && task === 'list') {
    listFruits(event)
      .then(data => respond(data, callback))
      .catch(err => error(formatErrors(err), callback));
    return null;
  }

  let handler;
  switch (`${method}-${task}`) {
    case 'post-create':
      handler = createFruit(event);
      break;
    case 'get-single':
      handler = getFruit(event);
      break;
    case 'post-edit':
      handler = editFruit(event);
      break;
    case 'delete-user':
      handler = deleteFruit(event);
      break;
    default:
      return "ROUTE_NOT_FOUND";
  }
}