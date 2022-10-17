from deepgram import Deepgram
import asyncio


async def detectTopic(api_key, payload):
    dg_client = Deepgram(api_key)

    source = {'url': payload['fileUrl']}

    try:
        response = await dg_client.transcription.prerecorded(source, {"model": 'general', 'detect_topics': True})
    except Exception as e:
        return {'success': False, 'message': str(e)}

    return {'success': True, 'deepgramData': response}


def main(req, res):

    payload = req.payload

    api_key = req.variables['DEEPGRAM_API_KEY']

    rs = asyncio.run(detectTopic(api_key, payload))

    return res.json(rs)
