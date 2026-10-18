# On LLM Use

Some reflections on 1+ year of heavy LLM usage:
 
- LLMs are very good at synthesizing information.
- LLMs are great as an API reference (goes back to the previous bullet)
- LLMs are amazing for quick prototyping.
- LLMs are ok at teaching. Check out the [Socratic Prompt](https://deepakness.com/raw/socratic-tutoring/).
- LLMs are forgetful of their instructions over a long enough session.
- LLMs are verbose. Their implementations tend to be on the "over-engineered" side.
- LLMs make it easy to be lazy. This can be dangerous, particularly in important pieces of code.
    - Ran into an error? Paste it into the chat and have it work through it. The outcome might be less time to fix an error, but it robs you of the knowledge of why this error ocurred. For important systems, its crucial to take an active approach.
 
Rules for myself:
- Use LLMs to learn about a codebase.
- Use LLMs to implement direct instructions
- Don't let LLMs write large (~500 lines?) pieces of code in projects I don't understand.
 
At the end of the day, LLMs are a tool. Harness it, but not at the expense of your skills. As an engineer, the buck stops with you.