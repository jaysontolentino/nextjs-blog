import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getPostsId() {

  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map(filename => {
    return {
      params: {
        id: filename.replace(/\.md$/, '')
      }
    }
  })

}
export async function getPostData(id) {

  const filename = path.join(postsDirectory, `${id}.md`)

  const content = fs.readFileSync(filename, 'utf8')

  const mattRes = matter(content)

  const processedContent = await remark()
  .use(html)
  .process(mattRes.content)

  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...mattRes.data
  }

}