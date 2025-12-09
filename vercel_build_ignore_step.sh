    #!/bin/bash

    if [[ "$VERCEL_GIT_COMMIT_REF" == "main" ]] ; then
      # Proceed with the build if the commit is on the 'main' branch
      echo "✅ - Build can proceed for main branch"
      exit 1
    else
      # Don't build for any other branch (e.g., feature branches, preview deployments)
      echo "🛑 - Build cancelled for non-main branch"
      exit 0
    fi