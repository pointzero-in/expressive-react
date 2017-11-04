import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const todosSchema = new Schema({
  name: { type: 'String', required: true },
  status: { type: 'String', required: true, default: 'PENDING' },
  createdAt: { type: 'Date', default: Date.now, required: true },
  updatedAt: { type: 'Date', default: Date.now, required: true },
});

todosSchema.pre('findOneAndUpdate', function(next) {
	this.updatedAt = Date.now;
	next();
});

export default mongoose.model('Todos', todosSchema);
