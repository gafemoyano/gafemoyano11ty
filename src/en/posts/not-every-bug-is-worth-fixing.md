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

- **Implement end to end tests for your most valuable user flows**. If I could mention one investment of time that pays itself over tenfold, it would be this one. End to end tests are, generally, not easy to setup nor to maintain. But being able to deploy confidently is worth it and it will become your team's last line of defense to prevent an error from getting to production in the first place. It may seem obvious, but preventing bugs from getting through in the first place is the cheapest way to deal with them.

- **Use monitoring tools on your production environment**. There's multiple kinds of monitoring tools and dashboards that give you a sense of how things are running. From exception trackers, performance metrics, user reports, among others. These are all useful on their own way so it's up to each team to decide which ones to adopt. The important part here is not to obsess over every metric or crash report, but rather to look at the big picture and know how your application behaves during normal conditions so you can quickly identify when something is amiss . Furthermore, you'll have historical data to make decisions. Exception tracking tools, for example, will also keep records of how many users or times each error is being hit, which is very valuable when deciding if action must be taken immediately or it can wait a few days.

- **Set automatic alarms for when things go really wrong**. This will get you on your feet when an emergency does happen. Having dealt with emergencies successfully will give you and your team the confidence to not panic when they arrive, and to handle future incidents calmly and promptly. Their also quite easy to set up, so that's a lot of value for little effort.

- **Set automatic alarms for when things go really wrong**. They generally require little effort to set up and they serve a dual purpose. For one, they might prevent an issue from escalating into an emergency such as a server going down due to extreme load. If not, they'll make sure that your team can react on a timely manner and be the _first_ ones to know when an emergency arises. This will create trust amongst business areas and give the team the space it'll need in order to deal with the situation without added preassure. 
  
### Organizational Practices and Processes

The following practices are not about technology but rather about processes and how work is organized and expectations set internally as a company. They intend to create a sustainable environment for product teams and establishing clear communication lines.


- **Define what an emergency is and it's response.** As I said before, 95% of the time a bug shouldn't make you drop what you're doing. But then there's the remaining 5%. What does this percentage mean for your product? If you're upfront about the things that are _critical_ and will be treated as a _code red_ in case they fail you'll get reduce a lot of uncertainty for everyone at the company. Tech teams won't be troubled by non-emergencies, and management can have the ensurance to know that, when things go wrong, there's a plan for it.

- **Let the dust settle** after releasing new features. Honestly, I blame the adoption of Scrum and two week cycles for this. They're so short that you barely get anything and then there's the promise to have a release by the end of it. And right away, another cycle starts on the third week with a new batch of tickets. I think a healthier approach is to have longer and more ambicious cycles, say 4-6 weeks and then leave one or two weeks of **unscheduled work**. This is a good time to schedule a release, address immediate feedback and _settle down_. Let the team catch their breath and the new features to settle in.

- **Have bug cycles to clean up technical debt.** I've seen this one catching on popularity and it's quite effective in my experience. After two or three intense cycles working on new features, teams generally  welcome the chance to work on bugs or maybe pending tasks that they wouldn't get to do otherwise. This way you can change up the pace and avoid monotony and it's a good way to trim the backlogs every now and then.

- **Promote bugs to scheduled work.** This is a continuation of the idea that bugs aren't really special or different from other kinds of work. Some bugs have root causes that are a symptom of a bigger issue like a bad architectural choice a while back, or an external service that's not quite working as expected. This is usually not a fix for one person to take in the form of a bug ticket, and should rather be scheduled as a project in it's own right and be put on the table against other ideas for the decision makers to consider the trade-offs and opportunity costs of working on it.

## Closing thoughts

I hope these post will make you consider your view on what a bug is and the best way to deal with them. In the end, it's all about making great products that our users love and solving real problems for them. So if you feel like you're already fulfilling that mision, awesome! keep doing what's working for you. But if you're feeling like your product is not moving forward, please consider some of the ideas and practices written here. Maybe the way you're dealing with bugs is slowing you down. So next time you get a bug report, instead of saying **give me 15 minutes** you should reply, let's wait a few hours or until next week. Let's make sure that this bug is **worth fixing**.
