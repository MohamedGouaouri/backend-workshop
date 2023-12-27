import { Challenge } from "../models/Challenge.js"


export const getAll = async () => {
  return {
    code: 200,
    data: {
      success: true,
      data: await Challenge.find({})
    }
  }
}

export const createChallenge = async (challenge) => {
  try {
    const newChallenge = new Challenge(challenge)
    const success = await newChallenge.save()

    if (!success) return {
      code: 400,
      data: {
        success: false,
        msg: "can't create the challenge"
      }
    }
    return {
      code: 201,
      data: {
        success: true,
        msg: "challenge created successfuly",
        challenge: newChallenge
      }
    }

  } catch (e) {
    console.log(e);
    return {
      code: 500,
      data: {
        success: false,
        msg: "server error"
      }
    }
  }
}
export const getChallengeById = async (challengeId) => {
  try {
    let challenge = await Challenge.findById(challengeId, '-__v')

    if (!challenge) return {
      code: 400,
      data: {
        success: false,
        msg: "challenge doesn't exist"
      }
    }

    return {
      code: 200,
      data: {
        success: true,
        challenge,
      }
    }
  } catch (e) {
    console.log(e);
    return {
      code: 500,
      data: {
        success: false,
        msg: "server error"
      }
    }
  }
}
export const getChallengeTestsById = async (challengeId) => {
  try {
    const challenge = await Challenge.findById(challengeId)

    if (!challenge) return {
      code: 400,
      data: {
        success: false,
        msg: "challenge doesn't exist"
      }
    }
    const tests = challenge.tests;
    return {
      code: 200,
      data: {
        success: true,
        func_name: challenge.func_name,
        tests,
      }
    }
  } catch (e) {
    return {
      code: 500,
      data: {
        success: false,
        msg: "server error"
      }
    }
  }
}

export const getChallengesByCategorie = async (categorie) => {
  try {
    const challenges = await Challenge.find({ categorie: categorie });
    return {
      code: 200,
      data: {
        challenges,
      }
    }
  } catch (e) {
    console.error(e);
    return {
      code: 500,
      data: {
        success: false,
        msg: "server error"
      }
    }
  }
}
