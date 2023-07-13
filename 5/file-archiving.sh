#!/bin/bash
find ~/tmp -type f -mmin +3 -not -name "*.tar.gz" | xargs -I % sh -c 'tar -cvzf %.tar.gz % && rm %'