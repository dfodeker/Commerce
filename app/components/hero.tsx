import client from '@lib/contentful'

export default async function Hero() {
    client.getEntry('6LNJbAB8VEpqLe3LSG14XJ')
  .then((entry:any) => console.log(entry))
  .catch(console.error)
    return(
        <div>
            <h1>Hero</h1>
        </div>
    )
}