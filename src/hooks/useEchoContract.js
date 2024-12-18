import { useReadContract, useWriteContract, useWatchContractEvent } from 'wagmi';
import { echoAbi, echoContractAddress } from '../contracts/echo';

export function useEchoContract() {
  // Read all echoes from the contract
  const { 
    data: contractEchoes, 
    refetch: refetchEchoes,
    isLoading: isLoadingEchoes,
    error: readError 
  } = useReadContract({
    address: echoContractAddress,
    abi: echoAbi,
    functionName: 'getAllEchoes',
  });

  // Write contract function
  const { 
    writeContract: createEcho,
    data: createEchoData,
    error: writeError,
    isPending: isEchoCreating,
    isSuccess: isEchoCreated
  } = useWriteContract();

  // Watch for new echoes
  useWatchContractEvent({
    address: echoContractAddress,
    abi: echoAbi,
    eventName: 'EchoCreated',
    onLogs() {
      refetchEchoes?.();
    },
  });

  // Format echoes for UI
  const formattedEchoes = contractEchoes?.map((echo) => ({
    x: Number(echo.position.x) / 1000, // Convert from 0-1000 to 0-1
    y: Number(echo.position.y),
    message: echo.content,
    creator: echo.creator,
    important: false,
  })) || [];

  // Create new echo
  const createNewEcho = async (message, x, y) => {
    try {
      const scaledX = Math.floor(x * 1000); // Convert from 0-1 to 0-1000
      const scaledY = Math.floor(y);
      
      createEcho({
        address: echoContractAddress,
        abi: echoAbi,
        functionName: 'createEcho',
        args: [message, scaledX, scaledY],
      });
    } catch (error) {
      console.error('Error creating echo:', error);
      throw error;
    }
  };

  return {
    echoes: formattedEchoes,
    createNewEcho,
    isLoadingEchoes,
    isEchoCreating,
    isEchoCreated,
    readError,
    writeError,
  };
} 