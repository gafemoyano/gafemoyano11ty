---
title: Not every Bug is Worth Fixing
date: 2021-02-27
featured_image: /assets/img/articles/jairo-alzate-B4i1UkLGvOo-unsplash.jpg
featured_image_alt: Hairy caterpillar on a twig. El Salado, Envigado, Colombia.
image_caption: <span>Photo by <a href="https://unsplash.com/@jairoalzatedesign?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Jairo Alzate</a> on <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
description: Does it feel like your team is constantly putting out fires? That your product isn't moving forward because of constantly having to chase down bugs? Maybe it's time to reconsider your strategy, and start saying no to some of them.
tags:
  - engineering
  - teams
  - processes
layout: layouts/post.njk
---

On the early days of Savy, as we were building up the technology team and I did most of the coding, I took a very aggressive stance against fixing bugs: whenever someone asked me if I could fix it, my default answer would be **no**. This came as a shock to my co-founders'.

The conversation would go something like this:

- **What do you mean you're not going to fix it? SOMEBODY just sent me a screenshot of an error, it mu st be fixed! We can't let this happen again!**
- **Why?** I would respond, **it's just that one person. Let's wait and see if it happens to someone else. Or maybe 10 other people, then we can see if it's worth fixing.**

I'd say that 90% of the time it didn't end up happening. The bug didn't go anywhere, but it probably wasn't on a hot path on the application. It just wasn't that bad. Maybe it would come up later and get fixed down the line if it, but I certainly didn't need to look at it right away.

As a founder, it was easy for me to say no to bugs. But as the team grew, I wanted them to have the same benefit. Sure, we established a process around it, but as a general rule \*\*no bug was urgent. I believe this allowed us to focus on bigger, more ambitious projects even if it meant that bugs had to wait a bit more to get fixed, or maybe didn't get fixed at all.

In my experience, people tend to treat all bugs as emergencies. But really, few of them are and even fewer require an immediate response. I believe there's two arguments to support that claim. The first one is that fixing bugs is _expensive_ for you and your team, probably much more than you realize. The second one, is that **it's probably not that big of a deal**.

## A general misunderstanding of bugs

When you're developing a digital product there's going to be bugs. It's just a [fact about software](https://m.signalvnoise.com/software-has-bugs-this-is-normal/). But somehow, we've set unreal expectations to software quality. We act like if every bug is outrageous, and that it should be fixed as soon as possible if not sooner.

But what is a bug anyways? I think the definition is not so straight forward and to make matters worse, it might depend on your position. The same definition might not apply if you're a developer, a QA engineer or a Product Manager. I believe this general misunderstanding comes from the current industry trend to create specialized silos of expertise, instead of having multidisciplinary groups responsible for a part of the product or feature. This lack of a general definition makes it hard to agree on the severeness of a bug and the corresponding tradeoffs every role views them differently and measuring a different metric as KPI. Even worse, sometimes that metric has nothing to do with the scope of the project.

If you're building a new product then you're likely putting out new features to complete your vision, or trying out different ideas while your company finds market fit. This means you're writing more code which means you're introducing more bugs. And that's okay! it's part of the process, there's no point in achieving a perfectly correct piece of engineering if you haven't validated your product's market. What matters is that you're making progress on solving your user's needs and providing them value. But no one on the team should be losing sleep over an ever growing backlog of bugs.

There will come times, when a particularly bad bug breaks an important part of the application and it will be a real emergency that calls for a **code red all hands on** type of response. But this emergencies are **rare**. You can't go into panic response every time a piece of javascript code crashes a user's application.

In short not all bugs are equal. Some of them occur on very specific circumstances or to a very small set of users. Other's live in poorly frequented workflows or low impact features. So instead of panicking, wait. Check your dashboards, review your data. Chances are most of your users are getting by with their day just fine.

## The real cost of fixing a bug

In general, people tend to underestimate **the cost of interruption and context switching**. This is true for meetings, calls, instant messaging, and incidentally bug tickets. Reflect on how much it takes you to build up context and concentration when you're working on a task that requires deep focus. Writing a sensitive email, coding, designing a user interface. For most people, I'd say it takes at least 30 minutes to build up context on your task and pick up on where you left off, and at least another 30 minutes to get into your flow and start making progress. If by the time you manage to start being productive someone pokes you on the shoulder or over slack to go pay attention to something else, then that concentration build up didn't amount to much. Next time, you'll have to do it again. Imagine this happens a couple of times per week, if not more. If this is the case, then it wouldn't seem very surprising that you or your team are constantly behind schedule.

**Why should bugs cut the line?** If you spend time carefully considering on what next big project comes next, prioritizing work and setting ambitious objectives, why throw it all out of the window because of bugs? What makes them more important than the other work you've lined up? Bugs are work that need to be done by someone. As such, they should be weighted in with other tasks instead of cutting the queue by default.

**Bugs can lead down to rabbit holes.** A lot of times it's not obvious to pin point the root cause of the problem let alone a way to fix it. There might not even be a quick fix available once you manage to track down the problem. Keep this in mind next time you have an urge to go down the whole and chace a bug down. At the very least, I'd recommend setting strong time boundaries for diagnostics work.

## It's about company culture

When it comes to having good team dynamics and organizationonal culture, there's [no silver bullet](http://worrydream.com/refs/Brooks-NoSilverBullet.pdf). In my opinion, teams should experiment with different methodologies and practices and find what works best. Consequently, most of the learning in this article are derived from my own experience on start up product companies so that's the environment where they're likely to make most sense. However, I would dare to say these applies to broader engineering teams. If we want teams to be productive and deliver on time, they must be able to execute without being constantly distracted. A team that is working on challenging problems and making progress towards solving them is likely to stay a motivated team.

Having a company culture where every bug or ticket has a timer on it and must be solved ASAP ultimately drive's down a team's productivity and is detrimental to an organization. Let's explore some of the reasons why.

**It sets the unrealistic expectations for engineering teams.** At the beginning, it'll seem pretty harmless to deal with bugs right away. When the code base still fits in one person's head, it's a reasonable thing to do without getting lost in the weeds. But it won't stay that way for long and you've now set a precedent of responding immediately. As the code grows in size and complexity and new dependencies are introduced tasks that used to take a couple of minutes now take a couple of hours. Yet the expectation of immediate response will still be there and the team will constantly feel like it's treading water. The best way to prevent this scenario, is to kindly but firmly say **no** to this kind of work that's labeled as urgent. You'll soon realize, most of the time it wasn't that urgent after all.

**It encourages poor communication**. Just like there's a trend for bugs to cut in line on the priority queue they also tend to cut through the proper channels of communication. As a team lead, I've encountered more than one time a member of my team working on a bug fix just cause someone from another team asked him to. Founders are particularly guilty of this. Or maybe a person from support asked nicely via direct message to check on something out quickly. I'm not one to advocates for processes over good communication and common sense, but I've seen these practices add up to the point were they become a problem, like someone getting _abused_ because they're _too nice_ and never say no. I'm not saying that bugs shouldn't be reported, on the contrary I'd encourage everyone at a company to report bugs and take the time to do it properly. But let's get rid of the expectation that reporting it means assigning it to someone and putting a deadline on it. They'll be dealt with at the right time, which is, as I've repeated a few times already, _not now_.

**It's demoralizing for the team**. Let's consider for a secound the anxiety caused by constantly getting notifications for every error in a production environment. In this moderne age we've already started to see the psicological effects of consantly having reminders from our inboxes or direct messaging applications. This can lead to feelings of guilt and maybe even depression. I've seen organizations where it gets so overwhelming that people have to ignore it in order to keep their focus. Too little signal to noise ratio. Even if your team is able to handle the stream of incoming tickets while getting their schedule tasks done, it's probably slowing them down tremendously. And even if it isn't, for how long will they be able to keep it up? It's not a sustainable strategy on the mid term. There's a strong correlation between a team's [morale](https://www.isixsigma.com/implementation/teams/high-performance-teams-understanding-team-cohesiveness/) and it's capacity to [deliver](https://journals.sagepub.com/doi/10.1177/0730888406290054). If the equation breaks down at some point, you'll end up with an unhappy, unmotivated team.

## What about quality?

By now, I hope I was able to convince you that handling bugs as an emergency that should be addressed ASAP is a **bad idea**. Saying no to bugs will give you and your team the freedom to focus on delivering value and solving challenges during a product cycle, but they still need to be dealt with at some point. This is not an excuse to ignore them, however, I do believe there's a smarter way to deal with them. So let's go through a couple of techniques that are effective when it come's to bugs. I'd split them into two groups. **Technical safeguards and tactical organizational practices.**

### Technical Safeguards

These recommendations are mainly concerned with making sure that most of the things are fine for most of the users. This will give you the confidence to say no, when dealing with a bug that doesn't trip any alarms and peace of mind to keep doing what you're doing.

- **Have end to end tests for your most valuable user flows**. If I could mention one investment of time that pays itself over tenfold, it would be this one. End to end tests are, generally, not easy to setup nor to maintain. But being able to deploy confidently is worth it and it will become your team's last line of deffense to prevent an error from getting to production in the first place. It may seem obvious, but preventing bugs from getting through in the first place is the cheapest way to deal with them.

- **Monitor your applications and rely on data**. There's multiple kinds of monitoring dashboards. You want to keep an eye on the day to day, but most importantly you want to be looking at the bigger picture. Zoom out, and try to see if there's spikes or something that indicates a change of pattern in the number of errors, user reports, crashes, or other metrics you're monitoring.a

- **Set automatic alarms for when things go really** wrong. This will get you on your feet when an emergency does happen. Having dealt with emergencies successfully will give you and your team the confidence to not panic when they arrive, and to handle future incidents calmly and promptly. Their also quite easy to set up, so that's a lot of value for little effort.

- **Have end to end tests in place**. Seriously, if I could mention one investment of time that paid itself over tenfold, it would be this one. Contrary to having alerts or alarms, end to end tests are generally not easy to setup nor to maintain. But their worth it just for all the errors they'll catch before ending up in production, and the general peace of mind of having deployments that won't, with a certain degree of confidence, break your main application flows.

### Tactical

These recommendations are concerned with working effectively as an organization, and setting up clear boundaries and expectations between the different stake holders.

- **Define what an emergency is and what the response for it should be.** As I said earlier, 95% of the time a bug report shouldn't make you drop what you're doing and go look into it. But then there's the remaining 5%. What does this percentage mean for your product? What are the main user flows that people **depend on** on a day to day basis? What flow impacts your revenue stream directly? If you're clear about which errors are high impact and require an immediate response, everyone will breathe easier at the company. Tech teams won't be troubled by non-emergencies, and management can rest easy that, when things go wrong, there's going to be a response.

- **Let the dust settle** after releasing new features. Honestly, I blame two week cycles for this. They're so short, that you barely get anything done but there's the promise to deliver something by the end of it. And right away, another cycle starts on the third week. I think a healthier approach is to have longer cycles, say 4-6 weeks and then leave one or two weeks of **unscheduled work**. This is a good time to schedule a release, address immediate feedback or even go back on another project you'd been meaning to contribute to.

- **Have bug cycles to clean up technical debt.** I've seen this one catching on popularity and it's quite effective in my experience. A team will welcome the time to work exclusively on bugs, especially after a few intense product cycles, and it's a good way to trim the backlogs every now and then.

- **Promote bugs to scheduled work if they are worth it.** This is rare, but in my opinion should happen more often. Some bugs have root causes that are a symptom of a bigger issue. Maybe a bad architectural choice a while back, or a service that's not quite working as expected. This is usually not a fix for one person to take on as a bug ticket, and as such should be promoted into a project in itself and be pitched against other ideas with trade-offs and opportunity costs.

## Closing thoughts

I hope these post will at least make you consider your view on bugs and even your team's strategy towards how to deal with them. In the end, it's all about making great products that our users love and solving real problems. So if you're already on that path, then good for you! keep doing the things that work for you. But if you're feeling like you're not making substantial progress, do consider the points I made on this post. Maybe the way you're dealing with bugs it's slowing you down. So next time you get a bug report, instead of saying **give me 15 minutes** you should reply, let's wait a few hours or even a week. Let's make sure that this bug is **worth fixing**.
