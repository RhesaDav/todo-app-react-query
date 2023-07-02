'use client'
import React from 'react'

export const viewModel = () => {
    const sayHello = () => {
        window.alert('hello')
    }

  return {
    sayHello
  }
}