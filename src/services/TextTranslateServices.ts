import axios from 'axios'

const TextTranslateServices = {
  translateText: async (text: string, translateFrom: string, translateTo: string, key?: string) => {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${translateFrom}|${translateTo}`

    const fullUrl = key ? `${url}&key=${key}` : url

    const response = await axios.get(fullUrl)
    return response.data
  },
}

export default TextTranslateServices