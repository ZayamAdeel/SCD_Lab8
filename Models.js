import mongoose from 'mongoose';

// User model
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});
const User = mongoose.model('User', UserSchema);

// Event model
const EventSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    description: String,
    date: Date,
    category: String,
    reminderTime: Date,
    notified: { type: Boolean, default: false }
});
const Event = mongoose.model('Event', EventSchema);

export { User, Event }; 
