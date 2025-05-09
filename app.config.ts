export default defineAppConfig({
    ui: {
      badge: {
        slots: {
          base: 'font-medium inline-flex items-center',
          label: 'truncate',
          leadingIcon: 'shrink-0',
          leadingAvatar: 'shrink-0',
          leadingAvatarSize: '',
          trailingIcon: 'shrink-0'
        },
        variants: {
          buttonGroup: {
            horizontal: 'not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none',
            vertical: 'not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none'
          },
          color: {
            primary: '',
            secondary: '',
            success: '',
            info: '',
            warning: '',
            error: '',
            neutral: ''
          },
          variant: {
            solid: '',
            outline: '',
            soft: '',
            subtle: ''
          },
          size: {
            xs: {
              base: 'text-[8px]/3 px-1 py-0.5 gap-1 rounded-sm',
              leadingIcon: 'size-3',
              leadingAvatarSize: '3xs',
              trailingIcon: 'size-3'
            },
            sm: {
              base: 'text-[10px]/3 px-1.5 py-1 gap-1 rounded-sm',
              leadingIcon: 'size-3',
              leadingAvatarSize: '3xs',
              trailingIcon: 'size-3'
            },
            md: {
              base: 'text-xs px-2 py-1 gap-1 rounded-md',
              leadingIcon: 'size-4',
              leadingAvatarSize: '3xs',
              trailingIcon: 'size-4'
            },
            lg: {
              base: 'text-sm px-2 py-1 gap-1.5 rounded-md',
              leadingIcon: 'size-5',
              leadingAvatarSize: '2xs',
              trailingIcon: 'size-5'
            },
            xl: {
              base: 'text-base px-2.5 py-1 gap-1.5 rounded-md',
              leadingIcon: 'size-6',
              leadingAvatarSize: '2xs',
              trailingIcon: 'size-6'
            }
          }
        },
        compoundVariants: [
          {
            color: 'primary',
            variant: 'solid',
            class: 'bg-primary text-inverted'
          },
          {
            color: 'primary',
            variant: 'outline',
            class: 'text-primary ring ring-inset ring-primary/50'
          },
          {
            color: 'primary',
            variant: 'soft',
            class: 'bg-primary/10 text-primary'
          },
          {
            color: 'primary',
            variant: 'subtle',
            class: 'bg-primary/10 text-primary ring ring-inset ring-primary/25'
          },
          {
            color: 'neutral',
            variant: 'solid',
            class: 'text-inverted bg-inverted'
          },
          {
            color: 'neutral',
            variant: 'outline',
            class: 'ring ring-inset ring-accented text-default bg-default'
          },
          {
            color: 'neutral',
            variant: 'soft',
            class: 'text-default bg-elevated'
          },
          {
            color: 'neutral',
            variant: 'subtle',
            class: 'ring ring-inset ring-accented text-default bg-elevated'
          }
        ],
        defaultVariants: {
          color: 'primary',
          variant: 'solid',
          size: 'md'
        }
      },
      skeleton: {
        base: 'animate-pulse rounded-md bg-elevated'
      },
      
      avatar: {
        slots: {
          root: 'inline-flex items-center justify-center shrink-0 select-none overflow-hidden rounded-full align-middle bg-elevated',
          image: 'h-full w-full rounded-[inherit] object-cover',
          fallback: 'font-medium leading-none text-muted truncate',
          icon: 'text-muted shrink-0'
        },
        variants: {
          size: {
            '3xs': {
              root: 'size-4 text-[8px]'
            },
            '2xs': {
              root: 'size-5 text-[10px]'
            },
            xs: {
              root: 'size-6 text-xs'
            },
            sm: {
              root: 'size-7 text-sm'
            },
            md: {
              root: 'size-8 text-base'
            },
            lg: {
              root: 'size-9 text-lg'
            },
            xl: {
              root: 'size-10 text-xl'
            },
            '2xl': {
              root: 'size-11 text-[22px]'
            },
            '3xl': {
              root: 'size-12 text-2xl'
            }
          }
        },
        defaultVariants: {
          size: 'md'
        }
      }
        
      
      
    }
  })
  