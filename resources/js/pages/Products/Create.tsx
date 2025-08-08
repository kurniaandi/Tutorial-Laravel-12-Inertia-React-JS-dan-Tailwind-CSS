import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link } from '@inertiajs/react';
import { CircleAlert, ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tambah Produk Baru',
        href: '/products/create',
    },
];

export default function CreateProductForm() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        price: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('products.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Produk Baru" />

            <div className="max-w-3xl mx-auto mt-12 p-8 bg-white dark:bg-zinc-900 shadow-xl rounded-2xl border border-gray-200 dark:border-zinc-700">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Tambah Produk Baru</h2>
                    <Link
                        href="/products"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                    </Link>
                </div>


                <form onSubmit={handleSubmit} className="space-y-6">
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive">
                            <CircleAlert className="h-5 w-5" />
                            <AlertTitle className="text-base">Terjadi Kesalahan</AlertTitle>
                            <AlertDescription>
                                <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-base font-medium text-gray-800 dark:text-gray-200">
                                Nama Produk
                            </Label>
                            <Input
                                id="name"
                                placeholder="e.g. eBook Laravel"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="bg-white dark:bg-zinc-800 text-gray-900 dark:text-white border-gray-300 dark:border-zinc-600 focus-visible:ring-primary"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price" className="text-base font-medium text-gray-800 dark:text-gray-200">
                                Harga (IDR)
                            </Label>
                            <Input
                                id="price"
                                placeholder="e.g. 75000"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                className="bg-white dark:bg-zinc-800 text-gray-900 dark:text-white border-gray-300 dark:border-zinc-600 focus-visible:ring-primary"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-base font-medium text-gray-800 dark:text-gray-200">
                            Deskripsi
                        </Label>
                        <Textarea
                            id="description"
                            placeholder="eBook Laravel React JS Starter Kit by Lagikoding"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="bg-white dark:bg-zinc-800 text-gray-900 dark:text-white border-gray-300 dark:border-zinc-600 min-h-[120px] focus-visible:ring-primary"
                        />
                    </div>

                    <div className="pt-4">
                        <Button type="submit" disabled={processing} className="w-full text-base py-6 rounded-xl">
                            {processing ? 'Saving...' : 'Simpan'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
