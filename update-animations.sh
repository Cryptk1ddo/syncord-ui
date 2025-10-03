#!/bin/bash
sed -i 's/group-hover:scale-110 transition-transform/group-hover:scale-110 group-hover:rotate-3 transition-all duration-500/g' /workspaces/syncord-ui/src/app/landing/page.tsx
echo "Animation updates completed!"
