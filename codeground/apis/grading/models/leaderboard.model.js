import mongoose from 'mongoose'

const leaderboardSchema = new mongoose.Schema({
    coder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coder'
    },
    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge'
    },
    score: {
        type: Number
    }
})

export const LeaderBoard = mongoose.model('Leaderboard', leaderboardSchema);