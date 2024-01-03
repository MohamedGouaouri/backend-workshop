/**
 Submission:
{
    "code": "def factorial(n):\n\tif n == 0: return 1 \n\treturn n * factorial(n-1)",
    "challenge_id": "1112546548798"
}
*/
import axios from 'axios'
import { Challenge } from "../../content_management/models/Challenge.js";
import { RCE_SERVER } from '../../../config/server.config.js';
import { LeaderBoard } from '../models/leaderboard.model.js';
import { ServiceResponseFailure, ServiceResponseSuccess } from '../../common/service_response.js';
import { ResourceNotFoundException, SubmissionFailedException } from '../../common/exceptions.js';

export const grade = async (submission) => {
    console.log(submission);
    /**
     * Get challenge object
     * Invoke RCE service
     * if all tests are passed then
     *      - Calculate score based on the optimal code (low running time)
     *      - Add to leaderboard
     * end
     */
    const {challenge_id, coder_id} = submission;
    try {
        const challenge = await Challenge.findById(challenge_id);
        if (challenge) {
            const {code} = submission;
            const {func_name, tests} = challenge;
            const rceReq = {
                code,
                func_name,
                tests
            }
            // Invoke rce
            const rceResp = await (await axios.post(RCE_SERVER, rceReq)).data
            if (allTestsPassed(rceResp)) {
                // Create leaderboard item
                const lb = new LeaderBoard({
                    challenge: challenge_id,
                    coder: coder_id,
                    score: await calculateScore(challenge, rceResp)
                })
                await lb.save();
                return new ServiceResponseSuccess(
                    rceResp,
                )
            }
            return new ServiceResponseFailure(
                new SubmissionFailedException('Some tests have failed, Try a new submission')
            )
        }
        return new ServiceResponseFailure(
            new ResourceNotFoundException('No challenge found')
        )
    } catch (error) {
        console.error(error);
        return new ServiceResponseFailure(
            new ResourceNotFoundException('Can not grade your submission')
        )
    }
}

const allTestsPassed = (rceResp) => {
    return rceResp.status == 'passed'
}

const calculateScore = async (challenge, rceResp) => {
    const {test_results} = rceResp;
    let score = 0
    for (const test_result of test_results) {
        const {test_id, time} = test_result;
        const weight = await getTestWeight(challenge, test_id)
        score += weight / time;
    }
    return score
}

const getTestWeight = async (challenge, test_id) => {
    try {
        return challenge.tests.filter(test => test._id == test_id)[0].weight
    } catch (err){
        console.error(err);
    }
}