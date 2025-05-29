<script>
  import { Button } from '@skeletonlabs/skeleton';
</script>

<div class="max-w-2xl mx-auto p-8">
  <h1 class="text-3xl font-bold mb-8">Skeleton UI Test Page</h1>
  
  <div class="space-y-4">
    <h2 class="text-xl font-semibold">Buttons</h2>
    
    <div class="flex flex-wrap gap-4">
      <Button>Default</Button>
      <Button variant="filled">Filled</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
    
    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-4">Button with Icon</h2>
      <Button>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd" />
        </svg>
        Download
      </Button>
    </div>
    
    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-4">Button Sizes</h2>
      <div class="flex items-center gap-4">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    </div>
    
    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-4">Button Colors</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Button variant="filled" color="primary">Primary</Button>
        <Button variant="filled" color="secondary">Secondary</Button>
        <Button variant="filled" color="tertiary">Tertiary</Button>
        <Button variant="filled" color="success">Success</Button>
        <Button variant="filled" color="warning">Warning</Button>
        <Button variant="filled" color="error">Error</Button>
      </div>
    </div>
  </div>
</div>
