export function isNextProductionBuildPhase(): boolean {
  return process.env.NEXT_PHASE === 'phase-production-build'
}

export function isPayloadGenerateCliPhase(): boolean {
  return process.env.PAYLOAD_CLI === 'true'
}

export function shouldEnforceProductionPublicUrl(): boolean {
  if (process.env.NODE_ENV !== 'production') {
    return false
  }
  if (isNextProductionBuildPhase()) {
    return false
  }
  if (isPayloadGenerateCliPhase()) {
    return false
  }
  return true
}
