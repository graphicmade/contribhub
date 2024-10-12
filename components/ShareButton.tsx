import React from 'react'
import { Share1Icon } from '@radix-ui/react-icons'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ShareComponentProps {
    uuid: string;
    github_full_slug: string | null;
}

export default function ShareButton({ uuid, github_full_slug }: ShareComponentProps) {
  const shareUrl = `https://contribhub.com/projects/${uuid}`

  const shareToSocial = (platform: string) => {
    let url = ''
    const text = `Check out this project: ${github_full_slug}`

    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`
        break
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        break
      case 'reddit':
        url = `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(text)}`
        break
      case 'hackernews':
        url = `https://news.ycombinator.com/submitlink?u=${encodeURIComponent(shareUrl)}&t=${encodeURIComponent(text)}`
        break
    }

    window.open(url, '_blank')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Share1Icon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => shareToSocial('twitter')}>
          Share to X
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => shareToSocial('facebook')}>
          Share to Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => shareToSocial('reddit')}>
          Share to Reddit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => shareToSocial('hackernews')}>
          Share to Hacker News
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}