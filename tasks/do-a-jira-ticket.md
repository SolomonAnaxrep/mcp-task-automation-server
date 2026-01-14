#Do A Jira Ticket

**Description: Instructions on how to complete a Jira ticket**

**IMPORTANT: Whenever you complete a step, let me know that that step has been completed. For example, once you have completed step 5, say "Step 5 has been completed."**

##Steps:

1.  **Identify the Active Ticket**
    When I gave you this request, I might have given you the name or id of a Jira ticket. 
    That Jira ticket will be your Active Ticket.
    If I didn't give you the name or id of a Jira ticket, your Active Ticket will be the name of the first Jira ticket assigned to me which is in progress.
    Note that you will need to use the atlassian MCP server to complete this step.
    If you still have no Active Ticket, let me know and stop the task.
    Remember your Active Ticket. You will need it for future steps.

2. **Pull from main branch**
    Switch to the "main" branch and run git pull from there.

3. **Switch to a new branch**
    Create and switch to a new git branch
    The name of the branch should be the id of the ticket appended by name of the Active Ticket, seperated by a space, except all slashes and spaces are replaced with dashes.
    For example, if the id of the ticket is "ABC-123" and the name of the ticket is "Doing Something Productive", the branch name should be "ABC-123-Doing-Something-Productive"
    If you can't switch to a new branch because of uncommitted changes, commit them, then switch to the new branch.
  
4  **Push Branch to Github**
    Push the branch you created in step 3 to a new remote branch on github.
    The name of the remote branch should be the same as the name of the local branch.
    Use of the command "git push -u origin HEAD" is a good way to complete this step.

5. **Complete the Active Ticket**
    Complete all the tasks in the Active Ticket.
    By the end of this step, all functionality in the Active Ticket should be implemented.
    All changes from this step onwards should be made in the new branch.

6. **Test the Active Ticket**
    Ensure that no bugs were introduced by the changes you made in step 5.
    If you find any bugs, fix them.
    Do not build the application during this step - that will be done during step 9.

7. **Review the Active Ticket**
    Look at the Active ticket again and ensure that all the tasks in the Active Ticket have been completed.
    Ensure that the application functions exactly as it did before the changes you made in steps 5 and 6, except for the changes stated in the Active Ticket.
    Ensure that no unintended behavior was introduced by the changes you made in steps 5 and 6.
    If you find any unintended behavior or discrepancies in the behavior of the application vs. the requirements stated in the Active Ticket, fix it.

8. **Double Check Steps 6 and 7**
    If you found any bugs or unintended behavior in steps 6 and 7, repeat steps 6 and 7 until you are confident that the no features were introduced to or removed from the project except those listed in the Active Ticket.
    Also check that the ticket remains completed. We can't have you claiming that the ticket is complete when it's not.
    Repeat this step until you are confident that the application works as intended and contains no bugs or unintended behavior.

9. **Rebuild the Application**
    Run "npm run build" to rebuild the application.
    If the build fails, go back to step 6.

10. **Commit and Push the Changes**
    Commit the changes to the new branch.
    The commit message should describe the changes you made to the application.
    Push the changes to the remote repository.

1. **Notify the User**
    Notify the user that the Active Ticket has been completed.
    Tell the user the changes you have made to the application.
    Tell the user how you have completed the Active Ticket and pushed the changes to the remote repository.



