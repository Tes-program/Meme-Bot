import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
  key: String,
  count: {
    type: Number,
    default: 0
  }
});

const Counter = mongoose.model('Counter', counterSchema);

async function getCurrentCounter(key) {
  let counter = await Counter.findOne({ key });
  if (!counter) {
    counter = new Counter({ key });
    await counter.save();
  }
  return counter.count;
}

async function incrementCounter(key) {
  let counter = await Counter.findOne({ key });
  if (!counter) {
    counter = new Counter({ key });
  }
  counter.count += 1;
  await counter.save();
  return counter.count
}

async function createCounter(key, count = 0) {
  const counter = new Counter({ key, count });
  await counter.save();
}

export { Counter, getCurrentCounter, incrementCounter, createCounter };
