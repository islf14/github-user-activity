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
  const text = `\n  ==> ${output} \n`
  return text
}

async function myFunction (input) {
  const url = `https://api.github.com/users/${input}/events`
  const res = await fetch(url)
  const allEvents = await res.json()
  if (allEvents.length > 0) {
    const countEvents = allEvents.length
    console.log('\n Output: \n')

    for (const property in allEvents) {
      const nameRepo = allEvents[property].repo.name
      const eDate = new Date(allEvents[property].created_at).toLocaleDateString()

      switch (allEvents[property].type) {
        case 'CommitCommentEvent':
          console.log(`- ${eDate} - Created a comment in a commit it ${nameRepo}`)
          break;

        case 'CreateEvent':
          const cERef_type = allEvents[property].payload.ref_type
          if (cERef_type === 'branch') console.log(`- ${eDate} - Created a new branch in ${nameRepo}`)
          if (cERef_type === 'tag') console.log(`- ${eDate} - Created a new tag in ${nameRepo}`)
          if (cERef_type === 'repository') console.log(`- ${eDate} - Created the repository ${nameRepo}`)
          break;

        case 'DeleteEvent':
          const dERef_type = allEvents[property].payload.ref_type
          if (dERef_type === 'branch') console.log(`- ${eDate} - Deleted a branch in ${nameRepo}`)
          if (dERef_type === 'tag') console.log(`- ${eDate} - Deleted a tag in ${nameRepo}`)
          break;

        case 'ForkEvent':
          console.log(`- ${eDate} - Forked ${nameRepo}`)
          break;

        case 'GollumEvent':
          console.log(`- ${eDate} - Created or edited a wiki page for ${nameRepo}`)
          break;

        case 'IssueCommentEvent':
          const iCAction = allEvents[property].payload.action
          if (iCAction === 'created') console.log(`- ${eDate} - Created a comment in a issue in ${nameRepo}`)
          if (iCAction === 'edited') console.log(`- ${eDate} - Edited a comment in a issue in ${nameRepo}`)
          if (iCAction === 'deleted') console.log(`- ${eDate} - Deleted a comment in a issue in ${nameRepo}`)
          break;

        case 'IssuesEvent':
          const iAction = allEvents[property].payload.action
          if (iAction === 'opened') console.log(`- ${eDate} - Opened a issue in ${nameRepo}`)
          if (iAction === 'edited') console.log(`- ${eDate} - Edited a issue in ${nameRepo}`)
          if (iAction === 'closed') console.log(`- ${eDate} - closed a issue in ${nameRepo}`)
          if (iAction === 'reopened') console.log(`- ${eDate} - reopened a issue in ${nameRepo}`)
          if (iAction === 'assigned') console.log(`- ${eDate} - assigned a issue in ${nameRepo}`)
          if (iAction === 'unassigned') console.log(`- ${eDate} - unassigned a issue in ${nameRepo}`)
          if (iAction === 'labeled') console.log(`- ${eDate} - Opened a issue in ${nameRepo}`)
          if (iAction === 'unlabeled') console.log(`- ${eDate} - Opened a issue in ${nameRepo}`)
          break;

        case 'MemberEvent':
          console.log(`- ${eDate} - Added a new collaborator to ${nameRepo}`)
          break;

        case 'PublicEvent':
          console.log(`- ${eDate} - Made public ${nameRepo}`)
          break;

        case 'PullRequestEvent':
          const pRAction = allEvents[property].payload.action
          if (pRAction === 'opened') console.log(`- ${eDate} - Opened a Pull Request in ${nameRepo}`)
          if (pRAction === 'edited') console.log(`- ${eDate} - Edited a Pull Request in ${nameRepo}`)
          if (pRAction === 'closed') console.log(`- ${eDate} - Closed a Pull Request in ${nameRepo}`)
          if (pRAction === 'reopened') console.log(`- ${eDate} - Reopened a Pull Request in ${nameRepo}`)
          if (pRAction === 'assigned') console.log(`- ${eDate} - Assigned to Pull Request in ${nameRepo}`)
          if (pRAction === 'unassigned') console.log(`- ${eDate} - Was not assigned to Pull Request in ${nameRepo}`)
          if (pRAction === 'review_requested') console.log(`- ${eDate} - Made a request review to Pull Request in ${nameRepo}`)
          if (pRAction === 'review_request_removed') console.log(`- ${eDate} - Removed a request review to Pull Request in ${nameRepo}`)
          if (pRAction === 'labeled') console.log(`- ${eDate} - Made a label to Pull Request in ${nameRepo}`)
          if (pRAction === 'unlabeled') console.log(`- ${eDate} - Removed a label to Pull Request in ${nameRepo}`)
          if (pRAction === 'synchronize') console.log(`- ${eDate} - Synchronized a Pull Request in ${nameRepo}`)
          break;

        case 'PullRequestReviewEvent':
          console.log(`- ${eDate} - Created a review in ${nameRepo}`)
          break;

        case 'PullRequestReviewCommentEvent':
          console.log(`- ${eDate} - Commented on a pull request in ${nameRepo}`)
          break;

        case 'PullRequestReviewThreadEvent':
          const pRTAction = allEvents[property].payload.action
          if (pRTAction === 'resolved') console.log(`- ${eDate} - The thread was resolved in ${nameRepo}`)
          if (pRTAction === 'unresolved') console.log(`- ${eDate} - The thread was not resolved in ${nameRepo}`)
          break;

        case 'PushEvent':
          const numberCommits = allEvents[property].payload.size
          if (numberCommits > 1) console.log(`- ${eDate} - Pushed ${numberCommits} commits to ${nameRepo}`)
          else console.log(`- ${eDate} - Pushed ${numberCommits} commit to ${nameRepo}`)
          break;

        case 'ReleaseEvent':
          console.log(`- ${eDate} - Published ${nameRepo}`)
          break;

        case 'SponsorshipEvent':
          console.log(`- ${eDate} - Created a new sponsorship in ${nameRepo}`)
          break;

        case 'WatchEvent':
          console.log(`- ${eDate} - Starred ${nameRepo}`)
          break;
      }
    }
    return `Total number of events: ${countEvents}`
  }
  else return 'There it no recent activity'
}