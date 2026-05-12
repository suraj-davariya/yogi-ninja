# State Management and Token Limit Safeguards

## Checkpoint Driven Architecture
To prevent the AI agents from losing their train of thought or running out of tokens, all operations must be stateless and chunked. The AI will never attempt to build the entire application or scrape all recipes in a single prompt.

## The Checklist State File
The AI will maintain a file named `system_state_checklist.md` in the root directory. This file acts as the memory bank. 
1. Phase One: Repository Setup (Pending)
2. Phase Two: UI Component Generation (Pending)
3. Phase Three: Data Ingestion Batch 1 (Pending)
4. Phase Four: Data Ingestion Batch 2 (Pending)

## Micro Batch Execution Loop
The AI operates strictly within small batches. 
1. The AI reads the checklist to find the next pending task.
2. The AI executes exactly one task. For example, it formulates exactly three pregnancy safe recipes.
3. The AI writes the output to the database.
4. The AI marks the task as "Complete" in the checklist file.
5. The AI stops and waits for the next trigger.

If the token limit is reached or the IDE crashes, the next agent simply reads `system_state_checklist.md` and resumes exactly where the previous agent stopped.