import repl from 'node:repl'

repl.start({
  prompt: 'github-activity >> ',
  eval: myEval,
  writer: myWriter
})

async function myEval (cmd, context, filename, callback) {
  callback(null, await myFunction(cmd))
}

function myWriter (output) {
  const text = `  ==> ${output} \n`
  return text
}

async function myFunction (input) {
  // const url = `https://api.github.com/users/${input}/events`
  const url = 'https://api.github.com/users/kamranahmedse/events'
  // const url = 'https://api.github.com/users/islf14/events'
  const res = await fetch(url)
  const allEvents = await res.json()
  if (allEvents.length > 0) {
    console.log('\n Output: \n')
    for (const property in allEvents) {
      // console.log(allEvents[property].id + ' - ' + allEvents[property].type)
      switch (allEvents[property].type) {
        case 'CommitCommentEvent':
          console.log(allEvents[property].id + ' - ' + allEvents[property].type)
          console.log(allEvents[property].repo.name)
          break;
        case 'CreateEvent':
          console.log(allEvents[property].id + ' - ' + allEvents[property].type)
          console.log(allEvents[property].repo.name)
          break;
        case 'DeleteEvent':
          console.log(allEvents[property].id + ' - ' + allEvents[property].type)
          console.log(allEvents[property].repo.name)
          break;
        case 'ForkEvent':
          console.log(allEvents[property].id + ' - ' + allEvents[property].type)
          console.log(allEvents[property].repo.name)
          break;
        case 'GollumEvent':
          console.log(allEvents[property].id + ' - ' + allEvents[property].type)
          console.log(allEvents[property].repo.name)
          break;
        case 'IssueCommentEvent':
          console.log(allEvents[property].id + ' - ' + allEvents[property].type)
          console.log(allEvents[property].repo.name)
          break;
        case 'IssuesEvent':
          console.log(allEvents[property].id + ' - ' + allEvents[property].type)
          console.log(allEvents[property].repo.name)
          break;
        case 'MemberEvent':
          console.log(allEvents[property].id + ' - ' + allEvents[property].type)
          console.log(allEvents[property].repo.name)
          break;
        case 'PublicEvent':
          console.log(allEvents[property].id + ' - ' + allEvents[property].type)
          console.log(allEvents[property].repo.name)
          break;
        case 'PullRequestEvent':
          console.log(allEvents[property].id + ' - ' + allEvents[property].type)
          console.log(allEvents[property].repo.name)
          break;

        case 'PullRequestReviewEvent':
          const nameRepo3 = allEvents[property].repo.name
          const output3 = `- Created a review in ${nameRepo3}`
          console.log(output3)
          break;

        case 'PullRequestReviewCommentEvent':
          const nameRepo2 = allEvents[property].repo.name
          const output2 = `- Commented on a pull request in ${nameRepo2}`
          console.log(output2)
          break;

        case 'PullRequestReviewThreadEvent':
          console.log(allEvents[property].repo.name)
          break;

        case 'PushEvent':
          const numberCommits = allEvents[property].payload.commits.length
          const nameRepo = allEvents[property].repo.name
          let s = ''
          if (numberCommits > 1) s = 's'
          const output = `- Pushed ${numberCommits} commit${s} to ${nameRepo}`
          console.log(output)
          break;

        case 'ReleaseEvent':
          console.log(allEvents[property].id + ' - ' + allEvents[property].type)
          console.log(allEvents[property].repo.name)
          break;
        case 'SponsorshipEvent':
          console.log(allEvents[property].id + ' - ' + allEvents[property].type)
          console.log(allEvents[property].repo.name)
          break;
        case 'WatchEvent':
          console.log(allEvents[property].id + ' - ' + allEvents[property].type)
          console.log(allEvents[property].repo.name)
          break;
        default:
          console.log('...')
      }
      console.log('\n')
    }
    return "success"
  }
  else return 'There it no recent activity'
}