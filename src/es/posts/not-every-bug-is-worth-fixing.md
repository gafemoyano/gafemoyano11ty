---
title: Not every Bug is Worth Fixing
date: 2021-02-27
featured_image: /assets/img/articles/jairo-alzate-B4i1UkLGvOo-unsplash.jpg
featured_image_alt: Hairy caterpillar on a twig. El Salado, Envigado, Colombia.
image_caption: <span>Photo by <a href="https://unsplash.com/@jairoalzatedesign?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Jairo Alzate</a> on <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
description: Does it feel like your team is constantly putting out fires? That your product isn't moving forward because of constantly having to chase down bugs? Maybe it's time to reconsider your strategy, and start saying no to some of them.
tags:
  - post
  - rails
  - forms
layout: layouts/post.njk
---

En los primeras días de Savy, dónde aún estábamos construyendo lo que sería el equipo de tecnología y yo aún escribía la mayoría del código, tomé una posición un tanto agresiva en contra de arreglar bugs. Cada vez que uno de mis socios se acercaba a mencionarme sobre algún nuevo error y si podría darle una mirada rápido y arreglarlo, mi respuesta por defecto era **no**.

Acto seguido, la conversación tomaría el siguiente curso:

- ¿Cómo así que no lo vas a arreglar? un usuario acaba de enviarme esta captura de pantalla del error ¡debemos arreglarlo antes que le suceda a alguien más!
- ¿Por qué? respondía yo, sólo le ha ocurrido a esta persona por ahora. Esperemos a verificar que le ocurra a alguien más, o incluso a varias personas. De ahí podemos decidir si **vale la pena** el esfuerzo de arreglarlo.

Podría afirmar que el 90% de las veces no terminaba sucediendo. No es que el bug se hubiera desaparecido, por su puesto, simplemente no estaba ocurriendo lo suficientemente seguido para que fuera un problema que tuviera que atender en _ese preciso momento_.

Como co-fundador estaba en una posición privilegiada para decir **no** y desafiar la expectativa de arreglar bugs tan pronto como fuera posible. Pero a medida que el equipo fue creciendo, quería extenderles a ellos el mismo poder. Por defecto, los bugs no serían considerados una emergencia. Creo que esta política nos permitió mantenernos enfocados en proyectos grandes y ambiciosos, así eso significara que los bugs iban a tener que esperar un poco en ser arreglados, si es que lograban convertirse en bugs _dignos_ de arreglarse.

En mi experiencia previa en la industria de software, los bugs siempre eran tratados como emergencias. En realidad, considero que pocos merecen acción inmediata. En mi opinión, hay dos argumentos para soportar esta afirmación. El primero es el costo de arreglar bugs es alto, mucho más alto de lo que parece a primera vista. El segundo, es que la mayoría de las veces los bugs **no son tan graves**.

## El gran malentendido de los bugs

Cuándo desarrollamos un producto digital van a existir bugs. Esto es algo [natural de todo software](https://m.signalvnoise.com/software-has-bugs-this-is-normal/). No obstante, hemos creado expectativas irreales en cuanto a la calidad del mismo. Como consumidores, actuamos con soberbia cada vez que encontramos un error en una aplicación. Y como miembros de la industria, como si cada error fuera un escándalo que debe ser arreglado tan pronto como sea posible, sino antes.

¿Cómo definir un bug? El problema de esta definición es que no creo que exista una única respuesta y, lo que es peor, el significado seguramente cambia según el rol que desempeñas, por lo que la misma definición no aplica para desarrolladores, analistas de calidad o gerentes de proyecto. En mi opinión, este malentendido viene de la tendencia actual de la industria de crear silos especializados de habilidades técnicas en lugar de tener grupos multidisciplinarios responsables por producto o funcionalidad de este. Es difícil a nivel organizacional ponerse de acuerdo en la severidad de un bug y discutir las ven tajas y desventajas de arreglarlo si cada equipo tiene una definición diferente en mente y, peor aún, métricas de éxito diferentes que no se alineen con el alcance del proyecto.

Si est ás en proceso de construir un nuevo producto seguramente estás desarrollando nuevos features para completar la visión del producto, probando algunas nuevas ideas para validar la viabilidad del mercado. Esto significa que estás escribiendo más código y, por lo tanto, creando nuevos bugs. ¡Y eso no tiene ningún problema! todo lo contrario, es parte del proceso. No tiene ningún sentido pulir una aplicación a la perfección si aún no has validado que existe un mercado para esta. Lo que importa es que estés progresando en el desarrollo del producto y resolviendo las necesidades de tus usuarios. Pero nadie en el equipo debería estar pasando noches en vela intentando mantener limpio un creciente backlog de errores.

Sí, seguramente llegará una situación en la que un bug terrible aparece y un flujo importante de la aplicación se ve afectado, lo que será una verdadera emergencia de **código rojo** y todo el mundo tendrá que poner las manos a la obra e nsolucionarlo. Pero estas situaciones son la _excepción_ no la regla. No puedes permitir que cada vez que un usuario se encuentra con un error en la aplicación el equipo entre en modo de pánico.

En resumen, no todos los bugs son iguales. Algunos aparecen en cirunstancias muy específicas o a una pequeñá cantidad de usuarios. Otros viven en algunos flujos de aplicación poco frecuentados o en funcionalidades de poco impacto. Así que en vez de correr a arreglarlos, es mejor esperar. Revisar los dashboards y los datos de usabilidad. Lo más posible es que la mayoría de los usuarios estén cumpliendo con su objetivo sin ningún problema.

## The real cost of fixing a bug

In general, people tend to underestimate **the cost of interruption and context switching**. This is true for meetings, calls, instant messaging, and incidentally bug tickets. Reflect on how much it takes you to build up context and concentration when you're working on a task that requires deep focus. Writing a sensitive email, coding, designing a user interface. For most people, I'd say it takes at least 30 minutes to build up context on your task and pick up on where you left off, and at least another 30 minutes to get into your flow and start making progress. If by the time you manage to start being productive someone pokes you on the shoulder or over slack to go pay attention to something else, then that concentration build up didn't amount to much. Next time, you'll have to do it again.

**Why should bugs cut the line?** If you spend time carefully considering on what next big project comes next, prioritizing work and setting ambitious objectives, why throw it all out of the window because of bugs? What makes them more important than the other work you've lined up? Bugs are work that need to be done by someone. As such, they should be weighted in with other tasks instead of cutting the queue by default.

**Bugs can lead down to rabbit holes.** A lot of times it's not obvious to pin point the root cause of the problem let alone an obvious way to fix it. There might not even be a quick fix available once you manage to track down the problem. Keep this in mind next time you have an urge to go down the whole and chace a bug down. At the very least, I'd recommend setting strong time boundaries for diagnostics work.

## It's about company culture

When it comes to team practices and organization culture, there's [no silver bullet](http://worrydream.com/refs/Brooks-NoSilverBullet.pdf). Most of the learning in this article are derived from my experience on start up product companies so that's the environment where they're likely to make most sense. However, I would dare to say these applies to broader engineering teams. If we want teams to be productive and deliver on time, they must be able to execute without being constantly distracted. Motivated teams are teams that are making progress and working on challenging problems.

Having a company culture where every bug or ticket has a timer on it and must be solved ASAP ultimately drive's down a team's productivity and is detrimental to an organization. Let's explore some of the reasons why.

**It sets the wrong expectations for you and your team.** At the beginning, it'll seem pretty harmless. When the team is small and the code base fits all in one person's head, it's a reasonable thing to do without getting lost in the weeds. You've now set a precedent of responding to a bug immediately and everyone is happy about how efficient you are. Problem is, it's not always going to be that way. You've set a dangerous precedent. The code is going to keep growing as you add more features. Dependencies that you can't control are going to be introduced. Other developers are going to write their own modules. And as I said earlier one, more code equals more bugs.

**It encourages poor communication**. Having tickets or bugs assigned on the fly as they pop up tend to jump multiple lines of communication. Even if there's a backlog instead of direct messages to keep track of them, it's still quite unsettling to constantly get popups of work being assigned to you or your team on your ticketing system. I've heard of multiple team leads **absorbing** all of the tickets reported during a development cycle to avoid losing focus. Should the backlogs be completely ignored? not at all. But there's something amiss between the expectations and the reality of the teams.

**It's demoralizing** in several ways. For one, think about the anxiety getting constant reminders of all the bugs on an application creates. This can lead to feelings of guilt and maybe even depression. I've seen organizations where it gets so overwhelming that people have to ignore it in order to keep their focus. Too little signal to noise ratio. Even if your team is able to handle the stream of incoming tickets while getting their schedule tasks done, it's probably slowing them down tremendously. And even if it isn't, for how long will they be able to keep it up? It's not a sustainable strategy on the mid term. There's a strong correlation between a team's [morale](https://www.isixsigma.com/implementation/teams/high-performance-teams-understanding-team-cohesiveness/) and it's capacity to [deliver](https://journals.sagepub.com/doi/10.1177/0730888406290054). If the equation breaks down at some point, you'll end up with an unhappy, unmotivated team.

## What about quality?

By now, I hope I was able to convince you that handling bugs as an emergency that should be addressed ASAP is a **bad idea**. Saying no to bugs will give you and your team the freedom to focus on delivering value and solving challenges during a product cycle, but they still need to be dealt with at some point. This is not an excuse to ignore them, however, I do believe there's a smarter way to deal with them. So let's go through a couple of techniques that are effective when it come's to bugs. I'd split them into two groups. **Strategic and tactical.** (What do I mean by this?)

### Technical

These recommendations are mainly concerned with making sure that most of the things are fine for most of the users. This will give you the confidence to say no, when dealing with a bug that doesn't trip any alarms and peace of mind to keep doing what you're doing.

- **Define what an emergency is and what the response for it should be.** As I said earlier, 95% of the time a bug report shouldn't make you drop what you're doing and go look into it. But then there's the remaining 5%. What does this percentage mean for your product? What are the main user flows that people **depend on** on a day to day basis? What flow impacts your revenue stream directly? If you're clear about which errors are high impact and require an immediate response, everyone will breathe easier at the company. Tech teams won't be troubled by non-emergencies, and management can rest easy that, when things go wrong, there's going to be a response.
- **Monitor your applications and rely on data**. There's multiple kinds of monitoring dashboards, but most of them will allow you to look at the big picture. Zoom out, and try to see if there's spikes or something that indicates a change of pattern in the number of errors, user reports, crashes, or whatever it is you're monitoring.
- **Set automatic alarms for when things go really** wrong. This will get you on your feet when an emergency does happen. Having dealt with emergencies successfully will give you and your team the confidence to not panic when they arrive, and to handle future incidents calmly and promptly. Their also quite easy to set up, so that's a lot of value for little effort.
- **Have end to end tests in place**. Seriously, if I could mention one investment of time that paid itself over tenfold, it would be this one. Contrary to having alerts or alarms, end to end tests are generally not easy to setup nor to maintain. But their worth it just for all the errors they'll catch before ending up in production, and the general peace of mind of having deployments that won't, with a certain degree of confidence, break your main application flows.

### Tactical

These points deal with working effectively as an organization, and setting up clear boundaries and expectations between the different stake holders.

- **Let the dust settle** after releasing new features. Honestly, I blame two week cycles for this. They're so short, that you barely get anything done but there's the promise to deliver something by the end of it. And right away, another cycle starts on the third week. I think a healthier approach is to have longer cycles, say 4-6 weeks and then leave one or two weeks of **unscheduled work**. This is a good time to schedule a release, address immediate feedback or even go back on another project you'd been meaning to contribute to.
- **Have bug cycles to clean up technical debt.** I've seen this one catching on popularity and it's quite effective in my experience. A team will welcome the time to work exclusively on bugs, especially after a few intense product cycles, and it's a good way to trim the backlogs every now and then.
- **Promote bugs to scheduled work if they are worth it.** This is rare, but in my opinion should happen more often. Some bugs have root causes that are a symptom of a bigger issue. Maybe a bad architectural choice a while back, or a service that's not quite working as expected. This is usually not a fix for one person to take on as a bug ticket, and as such should be promoted into a project in itself and be pitched against other ideas with trade-offs and opportunity costs.

## Closing thoughts

I hope these post will at least make you consider your view on bugs and even your team's strategy towards how to deal with them. In the end, it's all about making great products that our users love and solving real problems. So if you're already on that path, then good for you! keep doing the things that work for you. But if you're feeling like you're not making substantial progress, do consider the points I made on this post. Maybe the way you're dealing with bugs it's slowing you down. So next time you get a bug report, instead of saying **give me 15 minutes** you should reply, let's wait a few hours or even a week. Let's make sure that this bug is **worth fixing**.
