---
title: Not every Bug is Worth Fixing
date: 2021-02-27
featured_image: /assets/img/articles/jairo-alzate-B4i1UkLGvOo-unsplash.jpg
featured_image_alt: Oruga peluda en una rama. El Salado, Envigado, Colombia.
image_caption: <span>Foto por <a href="https://unsplash.com/@jairoalzatedesign?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Jairo Alzate</a> on <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
description: Does it feel like your team is constantly putting out fires? That your product isn't moving forward because of constantly having to chase down bugs? Maybe it's time to reconsider your strategy, and start saying no to some of them.
tags:
  - ingeniería
  - equipos
  - procesos
layout: layouts/post.njk
---

En los primeras días de Savy, dónde aún estábamos construyendo lo que sería el equipo de tecnología y yo aún escribía la mayoría del código, tomé una posición un tanto agresiva en contra de arreglar bugs. Cada vez que uno de mis socios se acercaba a mencionarme sobre algún nuevo error y si podría darle una mirada rápido y arreglarlo, mi respuesta por defecto era **no**.

Acto seguido, la conversación tomaría el siguiente curso:

- ¿Cómo así que no lo vas a arreglar? un usuario acaba de enviarme esta captura de pantalla del error ¡debemos arreglarlo antes que le suceda a alguien más!
- ¿Por qué? respondía yo, sólo le ha ocurrido a esta persona por ahora. Esperemos a verificar que le ocurra a alguien más, o incluso a varias personas. De ahí podemos decidir si **vale la pena** el esfuerzo de arreglarlo.

Podría afirmar que el 90% de las veces no terminaba sucediendo. No es que el bug se hubiera desaparecido, por su puesto, simplemente no estaba ocurriendo lo suficientemente seguido para que fuera un problema que tuviera que atender en _ese preciso momento_.

Como co-fundador estaba en una posición privilegiada para decir **no** y desafiar la expectativa de arreglar bugs tan pronto como fuera posible. Pero a medida que el equipo fue creciendo, quería extenderles a ellos el mismo poder. Por defecto, los bugs no serían considerados una emergencia. Creo que esta política nos permitió mantenernos enfocados en proyectos grandes y ambiciosos, así eso significara que los bugs iban a tener que esperar un poco en ser arreglados, si es que lograban convertirse en bugs _dignos_ de arreglarse.

En mi experiencia previa en la industria de software, los bugs siempre eran tratados como emergencias. En realidad, considero que pocos merecen acción inmediata. En mi opinión, hay dos argumentos para soportar esta afirmación. El primero es el costo de arreglar bugs es alto, mucho más alto de lo que parece a primera vista. El segundo, es que la mayoría de las veces los bugs **no son tan graves**.

## Bug: una palabra incomprendida

Cuándo desarrollamos un producto digital van a existir bugs. Esto es algo [natural de todo software](https://m.signalvnoise.com/software-has-bugs-this-is-normal/). No obstante, hemos creado expectativas irreales en cuanto a la calidad del mismo. Como consumidores, actuamos con soberbia cada vez que encontramos un error en una aplicación. Y como miembros de la industria, como si cada error fuera un escándalo que debe ser arreglado tan pronto como sea posible, sino antes.

¿Cómo definir un bug? El problema de esta definición es que no creo que exista una única respuesta y, lo que es peor, el significado seguramente cambia según el rol que desempeñas, por lo que la misma definición no aplica para desarrolladores, analistas de calidad o gerentes de proyecto. En mi opinión, este malentendido viene de la tendencia actual de la industria de crear silos especializados de habilidades técnicas en lugar de tener grupos multidisciplinarios responsables por producto o funcionalidad de este. Es difícil a nivel organizacional ponerse de acuerdo en la severidad de un bug y discutir las ven tajas y desventajas de arreglarlo si cada equipo tiene una definición diferente en mente y, peor aún, métricas de éxito diferentes que no se alineen con el alcance del proyecto.

Si estás en proceso de construir un nuevo producto seguramente estás desarrollando nuevos features para completar la visión del producto, probando algunas nuevas ideas para validar la viabilidad del mercado. Esto significa que estás escribiendo más código y, por lo tanto, creando nuevos bugs. ¡Y eso no tiene ningún problema! todo lo contrario, es parte del proceso. No tiene ningún sentido pulir una aplicación a la perfección si aún no has validado que existe un mercado para esta. Lo que importa es que estés progresando en el desarrollo del producto y resolviendo las necesidades de tus usuarios. Pero nadie en el equipo debería estar pasando noches en vela intentando mantener limpio un creciente backlog de errores.

Sí, seguramente llegará una situación en la que un bug terrible aparece y un flujo importante de la aplicación se ve afectado, lo que será una verdadera emergencia de **código rojo** y todo el mundo tendrá que poner las manos a la obra en solucionarlo. Pero estas situaciones son la _excepción_ no la regla. No puedes permitir que cada vez que un usuario se encuentra con un error en la aplicación el equipo entre en modo de pánico.

En resumen, no todos los bugs son iguales. Algunos aparecen en circunstancias muy específicas o a una pequeña cantidad de usuarios. Otros viven en algunos flujos de aplicación poco frecuentados o en funcionalidades de poco impacto. Así que en vez de correr a arreglarlos, es mejor esperar. Revisar los dashboards y los datos de usabilidad. Lo más posible es que la mayoría de los usuarios estén cumpliendo con su objetivo sin ningún problema.

## El verdadero costo de arreglar un bug

En general, existe una tendencia de subestimar el **costo de las interrupciones y el cambio de contexto**. Esto aplica para reuniones, llamadas, mensajes directos y, por su puesto, reportes de bugs. Hagamos el ejercicio de reflexionar cuánto tiempo tardas en reunir el contexto y la concentración cuando estás trabajando en una tarea que requiera de mucho enfoque. Por ejemplo, escribir un email sensible, codificar o diseñar una interfaz de usuario. Para muchas personas apostaría que toma al menos 30 minutos reunir el contexto necesario de la tarea y retomar donde habías quedado la última vez más otros 30 minutos para entrar en estado de flujo y empezar a progresar. Si a la hora que empiezas a ser productivo, alguien te toca el hombro (sea físicamente o por slack) y te pide que le pongas atención a otra cosa, esa torre de naipes en la mente y el tiempo que tomó construirla no generó ningún avance al final del día. La próxima vez que te sientes que en problema, tendrás que empezar de nuevo. Imagínate que esto suceda dos veces o más a la semana y de repente no te sorprenderías tanto que tu o tu equipo sientan que están constantemente atrasados en sus proyectos.

**¿Por qué deberían los bugs saltarse al frente de la cola?** Si invertimos una cantidad considerable de tiempo en planear nuestros proyectos, en priorizar las tareas y establecer objetivos ambiciosos, ¿por qué tirarlo todo por la ventana cuando se trata de un bug? ¿Qué los hace más importantes que las otras tareas que están en la lista de prioridades? Al final del día, también son trabajo que va a consumir horas de la persona que los realice. Como tal, deberían ponerse en la balanza con las demás tareas y decidir si, efectivamente, tienen la importancia necesaria en lugar de saltar inmediatamente al frente.

**Los bugs pueden conducir a agujeros de conejo**. Muchas veces la causa de un bug no es fácil ni obvia de encontrar, mucho menos la mejor forma de arreglarlo en caliente. Incluso una vez identificado el problema, puede que no exista una solución fácil para el mismo. Es importante tener esto en cuenta para la próxima vez que sientas el impulso de perseguir un bug. Como mínimo, recomendaría tener una cota de tiempo estricta para hacer el diagnóstico.

## Es un problema de cultura organizacional, no técnico

Cuando se trata de tener buenas dinámicas de equipo y cultura organizacional no existe una [receta maestra](http://worrydream.com/refs/Brooks-NoSilverBullet.pdf). En mi opinión, cada equipo debería evaluar distintas metodologías y ajustarlas según lo que mejor funcione. En consecuencia, muchos de los aprendizajes de este artículo están derivados de mis propias experiencias y experimentos en compañías tipo _start up_ y seguramente es en donde tendría más sentido aplicarlas. Sin embargo, me at revería a decir que estas lecciones aplican a equipos de ingeniería en cualquier contexto. Si el objetivo es lograr que los equipos sean productivos y logren los resultados esperados a tiempo, deben ser capaces de ejecutar sus tareas sin tener distracciones constantes. Un equipo que está trabajando en problemas retadores y progresando en su misión, seguramente se mantendrá motivado.

Tener una cultura donde cada bug tiene un temporizador encima para ser resuelto en el menor tiempo posible, impacta negativamente la productividad de un equipo y con el tiempo erosiona la cultura organizacional. Exploremos algunas razones del porqué:

**Crea expectativas irreales para los equipos de tecnología.** En un principio parecerá que no hay mayor problema en lidiar con los errores a medida que van apareciendo. Cuándo una aplicación es relativamente pequeña y aún cabe en la cabeza de una sola persona seguramente será una tarea sencilla y directa. El problema es que no siempre va a ser así y ahora hay un precedente de inmediatez bastante peligroso. A medida que el código aumenta en complejidad e interdependencias, esas pequeñas tareas que tomaban unos pocos minutos se convertirán en tareas de unas cuantas horas. Sin embargo las expectativas de inmediatez y velocidad para el equipo seguirán igual. La mejor forma de prevenir esta situación, es con un **no** comprensivo, pero firme ante cualquier trabajo con la etiqueta de _ahora mismo_. Después de un tiempo, te darás cuenta que la mayoría de las veces no era tan urgente en primer lugar.

**Incentiva malas prácticas de comunicación**. Así como los bugs tienen una tendencia a saltarse la cola de prioridades también tienden a saltarse los protocolos de comunicación. Como líder de equipo, más de una vez me encontré con personas trabajando en bugs porque un líder de otra área se los pidió. Los fundadores tienden a ser particularmente culpables de esta práctica. O tal vez alguien en servicio al cliente les pidió el favor de revisar un problema rápidamente. Personalmente, no me considero alguien que abogue por implementar procesos sobre buena comunicación y sentido común, pero he visto como este tipo de prácticas se salen de control hasta convertirse en un problema. Recuerdo un ejemplo de alguien que se estaba sobrecargando de trabajo porque era demasiado _cortés_ para decir que no ante estas solicitudes. No estoy diciendo que no se deban reportar bugs, al contrario, incentivaría a todas las áreas de una compañía a tomarse el tiempo de hacerlo apropiadamente. Pero dejemos atrás la expectativa que un reporte significa asignarle esa tarea a alguien y ponerle una fecha límite encima. Los reportes serán atendidos a su debido momento el cual, reitero, no es _ahora mismo_.

**Es desmoralizante para el equipo**. Consideremos por un minuto la ansiedad que produce tener notificaciones y recordatorios cada vez que aparece un nuevo bug en producción. De por sí en el mundo laboral actual ya estamos sufriendo los efectos psicológicos negativos de tener un flujo constante de notificaciones vía correo o aplicaciones de mensajería instantánea. Agregar bugs a esto puede inducir a sentimientos de culpa e incluso de depresión. Estas notificaciones pueden llegar a ser tan abrumadoras en volumen que algunos equipos terminan ignorándolas del todo. El ratio de señal a ruido es demasiado bajo. Incluso si el equipo aún está logrando controlar este flujo de notificaciones, a menos que existan personas dedicadas exclusivamente a esa tarea, seguramente los está atrasando considerablemente en su día a día. Y en ese caso, la pregunta es ¿por cuánto tiempo podrán sostener ese ritmo? Al final del día, no es una estrategia sostenible al mediano plazo y empezarán a quedarse cortos en sus entregas. Existe una correlación fuerte entre la [moral](https://www.isixsigma.com/implementation/teams/high-performance-teams-understanding-team-cohesiveness/) de un equipo y su capacidad de [cumplir con sus entregas](https://journals.sagepub.com/doi/10.1177/0730888406290054). Si el balance se rompe en algún momento, empieza un espiral negativo que termina en un equipo descontento y poco motivado.

## What about quality?

En este punto espero haberte convencido que manejar bugs como una emergencia que debe ser atendida tan pronto como sea posible es una **mala idea**. Decir que _no_ a los bugs le devolverá a tu equipo la libertad de enfocarse en resolver los retos que aparezcan durante el ciclo de desarrollo y entregar valor a los usuarios, sin embargo debemos lidiar con ellos en algún momento. Los puntos que resalté anteriormente no son una excusa para ignorarlos para siempre, sin embargo creo que existe una forma más sostenible e inteligente de lidiar con ellos.

### Guardias técnicas

Las guardias técnicas son herramientas de tecnología que nos permiten prevenir errores, ayudarnos a tomar decisiones y detectar emergencias oportunamente. Tener la seguridad que los flujos _más_ importantes de una aplicación están funcionando para la _mayoría_ de los usuarios evitará una respuesta de pánico y nos dará argumentos para priorizar efectivamente.

- **Implementa pruebas de integración para los flujos más importantes**. Si tuviera que escoger sólo una estrategia para implementar de las que voy a describir a continuación, sería esta. Es una inversión que tendrá un retorno de diez veces fácilmente. Las pruebas de integración (o _end to end_) no son fáciles ni de implementar ni de mantener. Pero tener la confianza de desplegar aplicaciones a producción sin miedo vale la pena y se convertirá en la última línea de defensa para prevenir que un error llegue a las manos de un usuario. Puede que esto suene obvio, pero la prevención es la forma más rápida y efectiva de lidiar con bugs.

- **Monitorea tus aplicaciones y basa tus decisiones en datos**. Hay múltiples herramientas que permiten ver el estado de una aplicación en productor desde la infraestructura, errores, tiempos de respuesta, etc. Trata de tener presente el día a día, pero lo más importante es poder disminuir el zoom y entender los patrones históricos. Ver si hay picos o valles inesperados que indiquen que algo no está bien.

- ** Monitor your applications and rely on data**. There's multiple kinds of monitoring dashboards. You want to keep an eye on the day to day, but most importantly you want to be looking at the bigger picture. Zoom out, and try to see if there's spikes or something that indicates a change of pattern in the number of errors, user reports, crashes, or other metrics you're monitoring.

- **Set automatic alarms for when things go really** wrong. This will get you on your feet when an emergency does happen. Having dealt with emergencies successfully will give you and your team the confidence to not panic when they arrive, and to handle future incidents calmly and promptly. Their also quite easy to set up, so that's a lot of value for little effort.

### Tactical

These points deal with working effectively as an organization, and setting up clear boundaries and expectations between the different stake holders.

- **Define what an emergency is and what the response for it should be.** As I said earlier, 95% of the time a bug report shouldn't make you drop what you're doing and go look into it. But then there's the remaining 5%. What does this percentage mean for your product? What are the main user flows that people **depend on** on a day to day basis? What flow impacts your revenue stream directly? If you're clear about which errors are high impact and require an immediate response, everyone will breathe easier at the company. Tech teams won't be troubled by non-emergencies, and management can rest easy that, when things go wrong, there's going to be a response.

- **Let the dust settle** after releasing new features. Honestly, I blame two week cycles for this. They're so short, that you barely get anything done but there's the promise to deliver something by the end of it. And right away, another cycle starts on the third week. I think a healthier approach is to have longer cycles, say 4-6 weeks and then leave one or two weeks of **unscheduled work**. This is a good time to schedule a release, address immediate feedback or even go back on another project you'd been meaning to contribute to.

- **Have bug cycles to clean up technical debt.** I've seen this one catching on popularity and it's quite effective in my experience. A team will welcome the time to work exclusively on bugs, especially after a few intense product cycles, and it's a good way to trim the backlogs every now and then.

- **Promote bugs to scheduled work if they are worth it.** This is rare, but in my opinion should happen more often. Some bugs have root causes that are a symptom of a bigger issue. Maybe a bad architectural choice a while back, or a service that's not quite working as expected. This is usually not a fix for one person to take on as a bug ticket, and as such should be promoted into a project in itself and be pitched against other ideas with trade-offs and opportunity costs.

## Closing thoughts

I hope these post will at least make you consider your view on bugs and even your team's strategy towards how to deal with them. In the end, it's all about making great products that our users love and solving real problems. So if you're already on that path, then good for you! keep doing the things that work for you. But if you're feeling like you're not making substantial progress, do consider the points I made on this post. Maybe the way you're dealing with bugs it's slowing you down. So next time you get a bug report, instead of saying **give me 15 minutes** you should reply, let's wait a few hours or even a week. Let's make sure that this bug is **worth fixing**.

---

### Agradecimientos

Gracias a mi incondicional amigo Felipe por ser siempre mi primer lector y crítico y a mi hermano David por su disposición y feedback oportuno. Sin la ayuda de ellos, mis pensamientos incoherentes difícilmente llegarían a convertirse en un artículo completo.
